const express = require('express');
const router = express.Router();
const path = require('path');
const pub = path.join(__dirname, '../public');

router.get('/', (req, res) => res.sendFile('index.html', { root: pub }));
router.get('/shop', (req, res) => res.sendFile('shop.html', { root: pub }));
router.get('/product/:id', (req, res) => res.sendFile('product.html', { root: pub }));
router.get('/category/:name', (req, res) => res.sendFile('category.html', { root: pub }));
router.get('/cart', (req, res) => res.sendFile('cart.html', { root: pub }));
router.get('/checkout', (req, res) => res.sendFile('checkout.html', { root: pub }));
router.get('/about', (req, res) => res.sendFile('about.html', { root: pub }));
router.get('/contact', (req, res) => res.sendFile('contact.html', { root: pub }));
router.get('/order-confirmation', (req, res) => res.sendFile('order-confirmation.html', { root: pub }));
router.get('/account', (req, res) => res.sendFile('account.html', { root: pub }));

module.exports = router;
