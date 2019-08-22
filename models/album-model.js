const connection = require('./album-connection');
const AlbumModel = () => {};

AlbumModel.save = (data, cb) => {
    connection.create(data, (err) => {
        if(err) throw err;
        cb();
    });
}

AlbumModel.findAll = (cb) => {
    connection
        .find()
        .exec((err, docs) => {
            if(err) throw err;
            cb(docs);
        });
};

AlbumModel.deleteAlbum = (id, cb) => {
    connection.remove({_id: id}, (err, docs)=>{
        if(err) throw err;
        cb(docs);
    });
}

AlbumModel.deletePhoto = (albumId, photoId, cb)=> {
    connection
        .findByIdAndUpdate(albumId,
            { $pull: {photos: {_id: photoId}}},
            {'new': true},
            (err, docs)=>{
                if(err) throw err;
                cb(docs);
    });
}



module.exports = AlbumModel;