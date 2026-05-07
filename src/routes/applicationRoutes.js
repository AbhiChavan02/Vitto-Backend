const express = require('express');

const router = express.Router();

const {
  evaluateApplication,
  getApplications,
} = require('../controllers/applicationController');

const applicationValidator = require('../validators/applicationValidator');

router.post(
  '/evaluate',
  applicationValidator,
  evaluateApplication
);

router.get('/', getApplications);

module.exports = router;