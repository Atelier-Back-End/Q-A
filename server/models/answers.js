const client = require('../db/pg.js');

module.exports = {

  getAll: async (questionID, page, count) => {
    const queryStr = `SELECT json_build_object(
                        'question', ${questionID},
                        'page', ${page},
                        'count', ${count},
                        'results', (SELECT json_agg(
                          json_build_object(
                            'answer_id', id,
                            'body', body,
                            'date', date_written,
                            'answerer_name', answerer_name,
                            'helpfulness', helpful,
                            'photos', (SELECT COALESCE(json_agg(
                              json_build_object(
                                'id', id,
                                'url', url
                              )
                            ), '[]'::json) FROM answers_photos WHERE answer_id = answers.id)
                          )
                        ) FROM answers WHERE question_id = ${questionID})
                      )`;
    const fetchAnswers = await client.query(queryStr);
    return fetchAnswers;
  },
  post: async (params) => {
    const queryStr = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, helpful) VALUES ($1, $2, to_timestamp(${Date.now() /1000}), $3, $4, $5) RETURNING id`;
    const postAnswer = await client.query(queryStr, params);
    return postAnswer;
  },
  postPhotos: async (answerID, url) => {
    const queryStr = `INSERT INTO answers_photos (answer_id, url) VALUES (${answerID}, ${url})`;
    const postPhoto = await client.query(queryStr);
    return postPhoto;
  },
  putHelpful: async (answerID) => {
    const queryStr = `UPDATE answers SET helpful = helpful + 1 WHERE id = ${answerID}`;
    const helpfulAnswer = await client.query(queryStr);
    return helpfulAnswer;
  },
  putReport: async (answerID) => {
    const queryStr = `UPDATE answers SET reported = true WHERE id = ${answerID}`;
    const reportAnswer = await client.query(queryStr);
    return reportAnswer;
  }

};