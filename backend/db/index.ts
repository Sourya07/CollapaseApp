import mongoose, { Schema, Document, Types } from 'mongoose';

/** User Interface & Schema */
export interface IUser extends Document {
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);

/** Data Interface & Schema */
export interface IData extends Document {
    type: 'document' | 'tweet' | 'youtube' | 'link';
    link: string;
    title: string;
    tags: string[];
    user: Types.ObjectId;
}

const DataSchema: Schema = new Schema({
    type: {
        type: String,
        enum: ['document', 'tweet', 'youtube', 'link'],
        required: true,
    },
    link: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: [String], default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Data = mongoose.model<IData>('Data', DataSchema);
