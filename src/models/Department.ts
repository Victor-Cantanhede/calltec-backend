import mongoose, { Schema } from 'mongoose';
import { IDepartment } from '../interfaces/IDepartment';

const DepartmentSchema: Schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);
export default Department;