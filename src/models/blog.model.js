"use strict"
/*
    BLOG API MODELS
*/

const mongoose = require("mongoose")

// BLOG CATEGORY:
const blogCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },

}, {
    collection: 'blogCategory',
    timestamps: true
})


// BLOG POST:
const blogPostSchema = new mongoose.Schema({
    
    blogCategoryId: {
        type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalID
        ref: 'BlogCategory',
        required: true,
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    published: {
        type: Boolean,
        default: true
    }

    //  createdAt //  updatedAt

}, {
    collection: "blogPost",
    timestamps: true
})
// mongoose.model('model ismi','hangi şemadan')

// const BlogPostModel= mongoose.model('BlogPost',blogPostSchema)
// module.exports={
//     BlogPost: BlogPostModel,

// }

module.exports = {
    BlogCategory: mongoose.model('BlogCategory', blogCategorySchema),
    BlogPost: mongoose.model('BlogPost', blogPostSchema),
}



