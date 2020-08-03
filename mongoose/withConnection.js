import mongoose from 'mongoose'

import { DISCONNECTED } from './connectionStates'

mongoose.connection.on('error', err => console.error('Mongoose Error:', err))
mongoose.connection.once('open', () => console.info('Mongoose is connected'))

export default function (handler) {
  return async function (req, res) {
    if (mongoose.connection.readyState === DISCONNECTED) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
      })
    }

    return handler(req, res)
  }
}