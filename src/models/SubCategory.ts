import mongoose, { Schema } from 'mongoose';
import { ISubCategory } from '../interfaces/ISubCategory';

const SubCategorySchema: Schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

const SubCategory = mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
export default SubCategory;