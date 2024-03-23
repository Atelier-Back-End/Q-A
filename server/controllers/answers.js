const answerModel = require('../models/answers.js');

module.exports = {

  getAnswers: async (req, res) => {

    const questionID = req.params.questionID;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const fetchAnswers = await answerModel.getAll(questionID, page, count);
    // if(err) {
    //   res.status(500).send('Error fetching answers:', err.message);
    // }
    res.status(200).send(fetchAnswers.rows[0].json_build_object);
    console.log('Successfully fetched answer data');

  },
  postAnswer: async (req, res) => {
    const questionID = req.params.questionID;
    const photosArr = req.body.photos || [];
    const params = [questionID, req.body.body, req.body.answerer_name, req.body.answerer_email, 0];
    const postAnswer = await answerModel.post(params);
    const answerID = postAnswer.rows[0].id;
    if(photosArr.length > 0) {
      photosArr.forEach((url) => {
        answerModel.postPhotos(answerID, `'${url}'`);
      })
    }
    /*if(err) {
      res.status(500).send("Error posting answer:", err.message);
    }*/
    res.status(201).send('Succesfully posted answer');
  },

  helpfulAnswer: async (req, res) => {

    const answerID = req.params.answerID;
    await answerModel.putHelpful(answerID);
    /*if (err) {
      res.status(500).send('Error with answer helpfulness:', err.message);
    }*/
    res.status(200).send("Successfully made answer helpful");
    //console.log("Successfully made answer helpful")
  },
  reportAnswer: async (req, res) => {
    const answerID = req.params.answerID;
    await answerModel.putReport(answerID);
    /*if (err) {
      res.status(204).send('Error reporting answer:', err.message);
    }*/
    res.status(200).send("Successfully reported answer");
    //console.log("Successfully reported answer");
  }

}