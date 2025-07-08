const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    blog_name: {
        type: String
    },
    
    blog_description: {
        type: String
    },
    blog_images: {
        type: [String] // Array of image paths
    },
    date: {
        type: Date,
        default: Date.now
      }
    
},
{
    collection: 'blogs'
});

module.exports = mongoose.model('BlogSchema', blogSchema);
