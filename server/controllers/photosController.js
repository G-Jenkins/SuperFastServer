const PhotosModel = require('../models/Photos.js')

const getPhotos = async (req, res) => {
  try {
    const photos = await PhotosModel.getPhotos();
    res.json(photos);
  } catch (err) {
    console.error('Error fetching photos: ', err);
    res.status(500).send('Internal Server Error')
  }
}

module.exports = { getPhotos };
