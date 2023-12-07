import * as mongoose from 'mongoose';

export const WorkSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  image: String,
  customerWebsite: String,
  isVisible: Boolean,
});
