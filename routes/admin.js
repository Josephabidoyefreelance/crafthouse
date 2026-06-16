const express = require('express');
const router = express.Router();

// Demo credentials — change these before going live
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'crafthouse2024';

// Middleware to protect admin routes
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin/dashboard');
  res.sendFile('admin-login.html', { root: require('path').join(__dirname, '../public') });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

router.get('/logout', (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/admin/login');
});

router.get('/dashboard', requireAdmin, (req, res) => {
  res.sendFile('admin-dashboard.html', { root: require('path').join(__dirname, '../public') });
});

module.exports = router;
module.exports.requireAdmin = requireAdmin;
