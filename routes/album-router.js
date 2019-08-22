const AlbumController = require('./../controllers/album-controller');
const express = require('express');
const router = express.Router();

router
    .get('/', AlbumController.findAll)
    .post('/', AlbumController.save)
    .delete('/delete/:id', AlbumController.deleteAlbum)
    .delete('/delete/:albumId/:photoid', AlbumController.deletePhoto);

module.exports = router;