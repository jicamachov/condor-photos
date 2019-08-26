const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Album
const albumSchema = new Schema({
    name: {type: String, default: '__other'}, // Name Album
    createdt: Date, // Create date album
    photos:[
        {
            caption: String, // Caption photo --> detail
            path: String,  // Path img in sever
            createdt: Date // Create date img
        }   
    ]
},{
    collection: 'album' // name collection
}); 

const AlbumModel = mongoose.model('Album', albumSchema); // Creating model album

// Connection to mondodb local
mongoose.connect('mongodb://localhost:27017/condorphotos', {useNewUrlParser: true}); 

module.exports = AlbumModel;
