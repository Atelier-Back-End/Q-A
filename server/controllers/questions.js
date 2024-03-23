const questionModel = require('../models/questions.js');

module.exports = {

  getQuestions: async (req, res) => {

    const productID = req.params.productID;
    const fetchQuestions = await questionModel.getAll(productID);
    res.status(200).send(fetchQuestions.rows[0].json_build_object);

    console.log('Successfully fetched question data');

  },
  postQuestion: async (req, res) => {
    const params = [req.body.product_id, req.body.body, req.body.asker_name, req.body.asker_email, 0];
    await questionModel.post(params);
    //if(err) {
      //res.status(500).send("Error posting question:", err.message);
    //}
    res.status(201).send('Succesfully posted question');
  },

  helpfulQuestion: async (req, res) => {

    const questionID = req.params.questionID;
    await questionModel.putHelpful(questionID);
    // if (err) {
    //   res.status(500).send('Error with question helpfulness:', err.message);
    // }
    res.status(200).send('Successfully updated helpful question');
  },
  reportQuestion: async (req, res) => {
    const questionID = req.params.questionID;
    await questionModel.putReport(questionID);
    // if (err) {
    //   res.status(204).send('Error reporting question:', err.message);
    // }
    res.status(200).send('Successfully reported question');
  }

}