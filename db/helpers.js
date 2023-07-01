import mongoose from 'mongoose';
import { DB_URI } from "../config/environment.js";

function connect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return mongoose.connect(DB_URI, options);
}

export default {
  connect,
};