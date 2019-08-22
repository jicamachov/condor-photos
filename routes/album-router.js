const AlbumController = require('./../controllers/album-controller');
const express = require('express');
const router = express.Router();

router
    .get('/', AlbumController.findAll)
    .get('/find/:albumId', AlbumController.findByAlbumId)
    .post('/create-album', AlbumController.save)
    .post('/add-photo', AlbumController.addPhoto)
    .delete('/delete/:id', AlbumController.deleteAlbum)
    .delete('/delete/:albumId/:photoId', AlbumController.deletePhoto);

module.exports = router;