const { Pool } = require('pg');
import pool = require('../db/db.js')

const getPhotos = async() => {
  const { rows } = await pool.query('SELECT * FROM photos LIMIT 10')
  return rows;
};

module.exports = { getPhotos }