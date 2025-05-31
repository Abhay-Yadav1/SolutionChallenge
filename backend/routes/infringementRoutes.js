const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
    detectInfringements,
    getInfringements,
    getInfringementDetails,
    updateInfringementStatus,
    getInfringementStats
} = require('./infringementController');

// Infringement detection and management routes
router.post('/detect', authMiddleware, detectInfringements);
router.get('/', authMiddleware, getInfringements);
router.get('/stats', authMiddleware, getInfringementStats);
router.get('/:id', authMiddleware, getInfringementDetails);
router.patch('/:id/status', authMiddleware, updateInfringementStatus);

module.exports = router; 