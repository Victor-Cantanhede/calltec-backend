import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

const CategorySchema: Schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;