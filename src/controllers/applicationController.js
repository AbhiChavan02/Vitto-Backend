const Application = require('../models/Application');

const AuditLog = require('../models/AuditLog');

const decisionEngine = require('../services/decisionEngine');

const evaluateApplication = async (
  req,
  res,
  next
) => {
  try {
    const result = decisionEngine(req.body);

    const savedApplication =
      await Application.create({
        ...req.body,
        ...result,
      });

    await AuditLog.create({
      applicationId: savedApplication._id,

      action: 'APPLICATION_EVALUATED',

      payload: req.body,
    });

    return res.status(201).json({
      success: true,

      message:
        'Application evaluated successfully',

      data: savedApplication,
    });
  } catch (error) {
    next(error);
  }
};

const getApplications = async (
  req,
  res,
  next
) => {
  try {
    const applications =
      await Application.find().sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count: applications.length,

      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  evaluateApplication,
  getApplications,
};