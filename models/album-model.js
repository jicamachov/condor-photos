const connection = require('./album-connection');
const AlbumModel = () => { };

// Save New Album with img 
AlbumModel.save = (data, cb) => {
    console.log(data);
    connection.create(data, (err, docs) => {
        if (err) cb(err);
        cb(false, docs);
    });
}


// Add new photo
AlbumModel.addPhoto = (albumId, data, cb) => {
    
    if (albumId == '__other') { // upload img without album
        connection
            .count({ name: albumId })
            .exec((err, count) => {
                if (err) cb(err);

                if (count == 0) { // No exist Album by default
                    const album = {
                        createdt: new Date().toLocaleDateString(),
                        photos: [data]
                    };
                    connection.create(album, (err) => {
                        if (err) cb(err);
                        cb(false, album);
                    });
                } else if (count == 1) { // exist album by default
                    connection.findOne({ name: '__other' }, (err, docs) => {
                        console.log(`AlbumId --> ${albumId}, docs --> ${docs}`)
                        if (err) {
                            cb(err);
                        } else {
                            docs.photos.push(data);
                            docs.save((err, album) => {
                                if (err) {
                                    cb(err);
                                } else {
                                    cb(false, album);
                                }
                            })
                        }
                    });
                }

            });
    } else { // Upload img for option album // no implemented
        connection.findById(albumId, (err, docs) => {
            console.log(`AlbumId --> ${albumId}, docs --> ${docs}`)
            if (err) {
                throw err;
            } else {
                docs.photos.push(data);
                docs.save((err, album) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(false,album);
                    }
                })
            }
        });
    }
}

// Retrieve a album by the filter _id
AlbumModel.findByAlbumId = (albumId, cb) => {
    connection
        .find({ _id: albumId })
        .exec((err, docs) => {
            if (err) cb(err);
            cb(false, docs);
        });
}

// Retrieve all album data of the db
AlbumModel.findAll = (cb) => {
    connection
        .find()
        .exec((err, docs) => {
            if (err) cb(err);
            cb(false, docs);
        });
};

// Delete album 
AlbumModel.deleteAlbum = (id, cb) => {
    connection.remove({ _id: id }, (err, docs) => {
        if (err) cb(err);
        cb(false, docs);
    });
}

// Delete photo
AlbumModel.deletePhoto = (albumId, photoId, cb) => {
    // console.log(`Album_id ${albumId} / Photo_id ${photoId}`);
    connection.findById(albumId, (err, docs) => {
        //  console.log(`AlbumId --> ${albumId}, docs --> ${docs}`)
        if (err) {
            cb(err);
        }

        docs.photos.pull({ _id: photoId });
        docs.save((err, album) => {
            if (err) {
                cb(err);
            } else {
                cb(false, album);
            }
        })
    });
}

module.exports = AlbumModel;