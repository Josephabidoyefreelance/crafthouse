const express = require('express');
const session = require('express-session');
const path = require('path');
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

app.listen(PORT, () => {
  console.log('Crafthouse Kitchen running at http://localhost:' + PORT);
  console.log('Admin panel: http://localhost:' + PORT + '/admin/login');
  console.log('Demo login — Username: admin | Password: crafthouse2024');
});
