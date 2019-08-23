const connection = require('./album-connection');
const AlbumModel = () => {};

AlbumModel.save = (data, cb) => {
    console.log(data);
    connection.create(data, (err) => {
        if(err) throw err;
        cb();
    });
}

AlbumModel.addPhoto = (albumId, data, cb) => {

    connection.findById(albumId, (err, docs) => {
        console.log(`AlbumId --> ${albumId}, docs --> ${docs}`)
        if (err){
            console.log(0)
            throw err;
        } else {
            console.log(1)
          docs.photos.push(data);
          docs.save((err, album) => {
              if (err) {
                cb(err);
              } else {
                cb(album);
              }
          })
        }
    });

    // connection
    //     .findOneAndUpdate(
    //         albumId,
    //         { $push: {'photos': data}},
    //         (err, docs) => {
    //             if(err) {
    //                 cb(err);
    //                 return;
    //             }
    //             cb(docs);
    //         }
    //         )
}

AlbumModel.findByAlbumId = (albumId, cb) => {
    connection
        .find({_id : albumId})
        .exec((err, docs) => {
            if(err) throw err;
            cb(docs);
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
    console.log(`Album_id ${albumId} / Photo_id ${photoId}`);
    
    connection.findOne({_id: albumId}, (err, album) => {
       cb(album);
    });

    connection.updateOne(
        {_id: albumId}, 
        { $pull: { 'photos._id': photoId} },
        { new: true },
        (err, docs) => {
            if(err) throw err;
            cb(docs);
        }
    );

    // connection
    //     .findByIdAndUpdate(albumId,
    //         { $pull: { 'photos': { _id: photoId} } },
    //         (err, docs)=>{
    //             if(err) throw err;
    //             cb(docs);
    // });


}
module.exports = AlbumModel;