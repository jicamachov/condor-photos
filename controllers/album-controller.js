const UploadComponent = require('./../components/upload-component');

const AlbumController = () => {};

AlbumController.save = (req, res, next) => {
    UploadComponent(req, res,(error) => {
        if(error){
            return res.status(406).send({ message: 'Invalid file type. Only JPG, PNG or GIF file are allowed.' });
        }else{
          if(req.file == undefined){            
            return res.status(406).send({ message: 'File size too large' });
          }else{
              console.log('Almacenado el archivo')
            // Logica save url file in mongodb
        }
      }
    }); 
}

module.exports = AlbumController;