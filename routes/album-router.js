const AlbumController = require('./../controllers/album-controller');
const express = require('express');
const router = express.Router();

// Configuration routes API
router
    .get('/', AlbumController.findAll) // Access to all albums
    .get('/find/:albumId', AlbumController.findByAlbumId) // Access to album by _id
    .post('/create-album', AlbumController.save) // Save a album 
    .post('/add-photo', AlbumController.addPhoto) // Save photo
    .post('/album/add-photo', AlbumController.addPhotoToAlbum) // Add photo to album
    .delete('/delete/:id', AlbumController.deleteAlbum) // Delete album
    .delete('/delete/:albumId/:photoId', AlbumController.deletePhoto); // Delete photo

module.exports = router;