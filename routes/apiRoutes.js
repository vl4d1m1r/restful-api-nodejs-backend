// Import 3rd party
const express = require('express');

// Import queries
const queries = require('../controllers/queries');

const router = express.Router();

router.use('/:apiParameter/:apiValue', queries.fetchData);
router.use('/:apiParameter', queries.fetchData);
router.use('/', queries.fetchData);

module.exports = router;
