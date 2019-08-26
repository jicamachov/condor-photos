const UploadComponent = require('./../components/upload-component');
const AlbumModel = require('./../models/album-model');

// Creating Album Controller
const AlbumController = () => { };

// Method Save Album
AlbumController.save = (req, res, next) => {
  // console.log(req.body); // Objects obtained
  // configuration object of type album 
  const album = {
    name: req.body.name,
    createdt: new Date().toISOString(),
    photos: req.body.photos
  }
  // Access to Model Album --> method save  
  AlbumModel.save(album, (err, docs) => {
    if (err) res.status(500).send({ data: err });

    res.status(200).send({ data: docs });
  }
  );
}

// Method add new photo
AlbumController.addPhoto = (req, res, next) => {
  // Call to component Upload --> storage photos in server 
  UploadComponent(req, res, (error) => {
    if (error) {
      return res.status(406).send({ message: 'Invalid file type. Only JPG, PNG or GIF file are allowed.' }); // Only IMG
    } else {
      if (req.file == undefined) {
        return res.status(406).send({ message: 'Error in the file' }); // Error file
      } else {
        // Creating object of type Photo
        const photo = {
          path: `albums/${req.file.filename}`,
          caption: req.body.caption,
          createdt: new Date().toLocaleDateString()
        }
        const album = req.body.album || '__other';
        // Access to Model Album --> method addPhoto
        AlbumModel.addPhoto(album, photo, (err, docs) => {
          if(err) res.status(500).send({ data: err }); 

          res.status(200).send({ data: docs });
        });
      }
    }
  });
};

AlbumController.addPhotoToAlbum = (req, res, next) => {
   // console.log(req.body); // Objects obtained
  // configuration object of type album 
  const photo = {
    caption: req.body.photo.caption,
    createdt: req.body.photo.createdt,
    path: req.body.photo.path
  }
  // Access to Model Album --> method save  
  AlbumModel.addPhoto(req.body.albumid, photo,  (err, docs) => {
    if (err) res.status(500).send({ data: err });

    res.status(200).send({ data: docs });
  }
  );

}

// Access to Model for to get album by _id 
AlbumController.findByAlbumId = (req, res, next) => {
  AlbumModel.findByAlbumId(req.params.albumId, (err, docs) => {
    if(err) res.status(500).send({ data: docs });

    res.status(200).send({ data: docs });
});
}

// Acces to Model --> get all albums
AlbumController.findAll = (req, res, next) => {
  AlbumModel.findAll((err, docs) => {
    if(err) res.status(500).send({ data: err });

    res.status(200).send({ data: docs });
  }
  );
}

// Acces to Model for delete album
AlbumController.deleteAlbum = (req, res, next) => {
  AlbumModel.deleteAlbum(req.params.id, (err, docs) => {
    if(err) res.status(500).send({ data: err });

    res.status(200).send({ data: docs });
  });
}

// Access to Model for delete photo
AlbumController.deletePhoto = (req, res, next) => {
  AlbumModel.deletePhoto(req.params.albumId, req.params.photoId, (err, docs) => {
    if(err) res.status(500).send({ data: err });
    
    res.status(200).send({ data: docs });
  });
}

module.exports = AlbumController;