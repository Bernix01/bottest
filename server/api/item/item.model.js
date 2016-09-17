'use strict';

import mongoose from 'mongoose';

var ItemSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Item', ItemSchema);
