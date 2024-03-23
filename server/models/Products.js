const { Pool } = require('pg');

import pool = require('../db/db.js')

const getProducts = async() => {
  const { rows } = await pool.query('SELECT * FROM products LIMIT 10')
  return rows;
};

module.exports = { getProducts }