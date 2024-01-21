import mongoose from 'mongoose';

const { Schema, model } = mongoose;;

export const userSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    role: String,
    sex: String,
    race: String,
    serial: String,
    money: Number,
    level: Number,
    rank: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number
});

const User = model('User', userSchema);

export default User;