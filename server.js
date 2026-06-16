const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

// Ensure required folders exist
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

const { readJSON, writeJSON } = require('./data/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'crafthouse-kitchen-2024-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Cart middleware
app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});

// Routes
app.use('/', require('./routes/pages'));
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Crafthouse Kitchen running on port ' + PORT);
  console.log('Admin: /admin/login | Username: admin | Password: crafthouse2024');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
