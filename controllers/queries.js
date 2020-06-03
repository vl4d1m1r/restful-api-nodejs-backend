// Import controllers
const db = require('./database');

/**
 * Function that executes MySQL query and
 * return result as a response.
 *
 * @param {string} dbQuery
 * @param {object} res
 */
const dbExecute = (dbQuery, res) => {
  db.execute(dbQuery)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((error) => {
      res.send(error);
    });
};

/**
 * Pure function that returns appropriate MySQL query
 * according to apiData it receive as parameter.
 *
 * @param {object} apiData
 */
const setDbQuery = (apiData) => {
  /**
   * GET
   */
  if (apiData.apiParameter === 'movies' && apiData.apiMethod === 'GET') {
    if (!apiData.apiValue) {
      // Get all posts
      return `SELECT * FROM ${apiData.apiParameter}`;
    }
    // Get selected posts
    return `SELECT * FROM ${apiData.apiParameter} WHERE id=${apiData.apiValue}`;
  }
  /**
   * POST
   */
  if (apiData.apiParameter === 'movies' && apiData.apiMethod === 'POST') {
    return `INSERT INTO ${
      apiData.apiParameter
    } (id, name, year, director) VALUES ("${apiData.apiQuery.id}", "${
      apiData.apiQuery.name
    }", ${parseInt(apiData.apiQuery.year)}, "${apiData.apiQuery.director}");`;
  }
  /**
   * DELETE
   */
  if (apiData.apiParameter === 'movies' && apiData.apiMethod === 'DELETE') {
    if (!apiData.apiValue) {
      return '400';
    }
    return `DELETE FROM ${apiData.apiParameter} WHERE id=${apiData.apiValue}`;
  }
  return '400';
};

module.exports.fetchData = (req, res) => {
  const apiData = {
    apiParameter: req.params.apiParameter,
    apiValue: parseInt(req.params.apiValue),
    apiMethod: req.method,
    apiQuery: req.query,
  };
  const dbQuery = setDbQuery(apiData);
  if (dbQuery !== '400') {
    dbExecute(dbQuery, res);
  } else {
    res.status(400).send('Bad query parameter/s!');
  }
};
