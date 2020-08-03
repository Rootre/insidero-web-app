import getModel from '../getModel'
import { Schema } from 'mongoose'

const UserModel = getModel('user', new Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
}))

export default UserModel