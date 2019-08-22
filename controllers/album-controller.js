const UploadComponent = require('./../components/upload-component');
const AlbumModel = require('./../models/album-model');

const AlbumController = () => { };


AlbumController.save = (req, res, next) => {
  const album = {
    name: req.body.name,
    createdt: new Date().toISOString(),
    photos: []
  }
 
  AlbumModel.save(album, (docs) => res.status(200).send({data: docs}));
}

AlbumController.addPhoto = (req, res, next) => {
  UploadComponent(req, res, (error) => {
    if (error) {
      return res.status(406).send({ message: 'Invalid file type. Only JPG, PNG or GIF file are allowed.' });
    } else {
      if (req.file == undefined) {
        return res.status(406).send({ message: 'File size too large' });
      } else {
        console.log('Almacenado el archivo')
        const photo = {
            path: `albums/${req.file.filename}`,
            caption: req.body.caption,
            date: new Date()
          }
        AlbumModel.addPhoto( req.body.album, photo, (docs) => res.status(200).send({ data: docs }));
      }
    }
  });
};

AlbumController.findByAlbumId = (req, res, next) => {
  AlbumModel.findByAlbumId(req.params.albumId, (docs) =>  res.status(200).send({data: docs}));
}

AlbumController.findAll = (req, res, next) => {
  AlbumModel.findAll((docs)=> res.status(200).send({data: docs}));
}

AlbumController.deleteAlbum = (req, res, next) => {
  AlbumModel.deleteAlbum(req.params.id, (docs) => res.status(200).send({ data: docs }));
}

AlbumController.deletePhoto = (req, res, next) => {
  AlbumModel.deletePhoto(req.params.albumId, req.params.photoId, (docs) => res.status(200).send({data: docs}));
}

module.exports = AlbumController;