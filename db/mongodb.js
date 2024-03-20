const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: Number,
  url: String
});

const answerSchema = new mongoose.Schema({
  answer_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  reported: Boolean,
  helpful: Number,
  photos: [photoSchema]
});

const questionSchema = new mongoose.Schema({
  question_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  answers: [answerSchema]
});

//create model
const QnA = mongoose.model('QnA', questionSchema);
//export model
module.exports = QnA;

//connect to MongoDB database

const mongodbURI = process.env.MONGODB_URI;

// Connect to MongoDB database
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });





