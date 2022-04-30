const express = require('express');
// const userClient = require('../client/user');

const router = express.Router();

// /* GET users listing. */
router.get('/:id/schedule', (req, res) => {
  res.json({ test: 'hello' });
});

module.exports = router;
