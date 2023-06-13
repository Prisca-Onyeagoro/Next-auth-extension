import { Schema, model, models } from 'mongoose';

const Userschema = new Schema({
  username: String,
  email: String,
  password: String,
});

const Users = models.user || model('user', Userschema);

export default Users;
