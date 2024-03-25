const { Pool } = require('pg');

const pool = require('../../db/db.js')

const getProducts = async() => {
  const { rows } = await pool.query('SELECT * FROM products')
  console.log('data')
  return rows;
};

module.exports = { getProducts }