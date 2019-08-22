const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: {type: String, default: 'other'},
    createdt: Date,
    photos:[
        {
            caption: String,
            path: String, 
            createdt: Date
        }
    ]
},{
    collection: 'album'
}); 

const AlbumModel = mongoose.model('Album', albumSchema);

mongoose.connect('mongodb://localhost:27017/condorphotos', {useNewUrlParser: true});

module.exports = AlbumModel;
