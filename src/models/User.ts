import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema({
    registration: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Formato de email inválido']
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accesslevel: {
        type: Number,
        default: 1,
        required: true
    }
}, { timestamps: true });

// Criptografia
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { return next() }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, salt);
        next();

    } catch (error) {
        next(error as Error);
    }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;