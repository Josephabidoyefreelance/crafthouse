const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const { readJSON, writeJSON, getNextProductId } = require('../data/db');
const { notifyOrder, notifyContact, notifyCustomer } = require('../utils/notify');

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads')),
  filename: (req, file, cb) => cb(null, 'product-' + Date.now() + '-' + Math.round(Math.random()*1000) + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 10*1024*1024 }, fileFilter: (req, file, cb) => file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Images only')) });

// PRODUCTS
router.get('/products', (req, res) => {
  let products = readJSON('products.json') || [];
  const { category, search, sort, page = 1, limit = 12 } = req.query;
  if (category) products = products.filter(p => p.category === category);
  if (search) { const q = search.toLowerCase(); products = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)); }
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  if (sort === 'name') products.sort((a, b) => a.name.localeCompare(b.name));
  const total = products.length;
  const start = (page - 1) * limit;
  res.json({ products: products.slice(start, start + parseInt(limit)), total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

router.get('/products/:id', (req, res) => {
  const products = readJSON('products.json') || [];
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.get('/categories', (req, res) => {
  const products = readJSON('products.json') || [];
  res.json([...new Set(products.map(p => p.category))]);
});

router.post('/products', upload.array('images', 10), (req, res) => {
  try {
    const { name, category, subcategory, price, description, badge } = req.body;
    if (!name || !category || !price) return res.status(400).json({ error: 'Name, category and price required' });
    const products = readJSON('products.json') || [];
    const newId = getNextProductId();
    const images = req.files && req.files.length ? req.files.map(f => '/uploads/' + f.filename) : ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'];
    const product = { id: newId, sku: 'CK-' + newId, name, category, subcategory: subcategory || '', price: parseInt(price), image: images[0], images, badge: badge || '', description: description || '' };
    products.push(product);
    writeJSON('products.json', products);
    res.json({ success: true, product });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/products/:id', (req, res) => {
  let products = readJSON('products.json') || [];
  products = products.filter(p => p.id !== parseInt(req.params.id));
  writeJSON('products.json', products);
  res.json({ success: true });
});

// CART
router.post('/cart/add', (req, res) => {
  const { productId, qty = 1 } = req.body;
  const products = readJSON('products.json') || [];
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (!req.session.cart) req.session.cart = [];
  const existing = req.session.cart.find(i => i.id === product.id);
  if (existing) existing.qty += parseInt(qty);
  else req.session.cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: parseInt(qty), sku: product.sku });
  res.json({ success: true, cart: req.session.cart, count: req.session.cart.reduce((s, i) => s + i.qty, 0) });
});

router.post('/cart/update', (req, res) => {
  const { productId, qty } = req.body;
  if (!req.session.cart) req.session.cart = [];
  const item = req.session.cart.find(i => i.id === parseInt(productId));
  if (item) { item.qty = parseInt(qty); if (item.qty <= 0) req.session.cart = req.session.cart.filter(i => i.id !== parseInt(productId)); }
  res.json({ success: true, cart: req.session.cart, count: req.session.cart.reduce((s, i) => s + i.qty, 0), total: req.session.cart.reduce((s, i) => s + i.price * i.qty, 0) });
});

router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;
  if (!req.session.cart) req.session.cart = [];
  req.session.cart = req.session.cart.filter(i => i.id !== parseInt(productId));
  res.json({ success: true, cart: req.session.cart, count: req.session.cart.reduce((s, i) => s + i.qty, 0) });
});

router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.json({ cart, total: cart.reduce((s, i) => s + i.price * i.qty, 0), count: cart.reduce((s, i) => s + i.qty, 0) });
});

router.post('/cart/clear', (req, res) => { req.session.cart = []; res.json({ success: true }); });

// ORDERS
router.post('/orders', async (req, res) => {
  const { firstName, lastName, email, phone, address, city, state, paymentMethod } = req.body;
  if (!firstName || !email || !address) return res.status(400).json({ error: 'Required fields missing' });
  const cart = req.session.cart || [];
  if (!cart.length) return res.status(400).json({ error: 'Cart is empty' });
  const orders = readJSON('orders.json') || [];
  const order = { id: uuidv4().slice(0, 8).toUpperCase(), customer: { firstName, lastName, email, phone, address, city, state }, items: cart, total: cart.reduce((s, i) => s + i.price * i.qty, 0), paymentMethod, status: 'Confirmed', createdAt: new Date().toISOString() };
  orders.push(order);
  writeJSON('orders.json', orders);
  req.session.cart = [];
  const waLink = await notifyOrder(order);
  await notifyCustomer(order);
  res.json({ success: true, orderId: order.id, order, waLink });
});

router.get('/orders-all', (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Unauthorized' });
  res.json(readJSON('orders.json') || []);
});

router.get('/orders/:id', (req, res) => {
  const orders = readJSON('orders.json') || [];
  const order = orders.find(o => o.id === req.params.id.toUpperCase());
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// CONTACT
router.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
  const waLink = await notifyContact({ name, email, phone, message });
  res.json({ success: true, waLink });
});

module.exports = router;
