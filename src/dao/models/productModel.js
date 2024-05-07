import {Schema, model} from "mongoose"
import  mongoosePaginate from "mongoose-paginate-v2"

const collection = "products"

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique : true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    owener: {
        type: String,
        default: "admin"
    }
})

productSchema.plugin(mongoosePaginate)
 export const productModel = model(collection,productSchema)

