const mongoose =  require('mongoose');

var postSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    postName: {
    type: String,

    },
    postimgUrl: {
      type: String,
   
      },
    postType: {
        type: String,
        },
    timestamp: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

module.exports=Post;