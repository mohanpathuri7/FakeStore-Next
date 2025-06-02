import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    category: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
}

const productSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        rating: {
            rate: { type: Number },
            count: { type: Number },
        },
        image: {
            type: String,
            validate: {
                validator: (url: string) =>
                    /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url),
                message: 'Invalid image URL',
            },
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.price = parseFloat(ret.price.toString());
                return ret;
            },
        },
    }
);

const ProductModel =
    mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
