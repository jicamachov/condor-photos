const AlbumController = require('./../controllers/album-controller');
const express = require('express');
const router = express.Router();

router.post('/', AlbumController.save);

module.exports = router;