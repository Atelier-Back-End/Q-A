const client = require('../db/pg.js');

module.exports = {

  getAll: async (productID) => {
    const queryStr = `SELECT
    json_build_object(
      'product_id', ${productID},
      'results', (SELECT json_agg(
        json_build_object(
          'question_id', id,
          'question_body', body,
          'question_date', date_written,
          'asker_name', asker_name,
          'question_helpfulness', helpful,
          'reported', reported,
          'answers', (SELECT json_object_agg(
            id, json_build_object(
              'id', id,
              'body', body,
              'date', date_written,
              'answerer_name', answerer_name,
              'helpfulness', helpful,
              'photos', (SELECT COALESCE(json_agg(answers_photos.url), '[]'::json) FROM answers_photos WHERE answer_id = answers.id)
            )
          ) FROM answers WHERE question_id = questions.id)
        )
      ) FROM questions WHERE product_id = ${productID} AND reported = false)
    )`;
    //product_id = ${productID} AND
    const fetchQuestions = await client.query(queryStr);
    return fetchQuestions;
  },
  post: async (params) => {
    const queryStr = `INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, helpful) VALUES ($1, $2, to_timestamp(${Date.now() / 1000}), $3, $4, $5)`;
    const postQuestion = await client.query(queryStr, params);
    return postQuestion;
  },
  putHelpful: async (questionID) => {
    const queryStr = `UPDATE questions \n
                      SET helpful = helpful + 1 \n
                      WHERE id = ${questionID}`;
    const helpfulQuestion = await client.query(queryStr);
    return helpfulQuestion;
  },
  putReport: async (questionID) => {
    const queryStr = `UPDATE questions \n
                      SET reported = true \n
                      WHERE id = ${questionID} \n
                      `;
    const reportQuestion = await client.query(queryStr);
    return reportQuestion;
  }
};