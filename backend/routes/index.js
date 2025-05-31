const express = require('express');
const router = express.Router();

const assetRoutes = require('./assetRoutes');
const infringementRoutes = require('./infringementRoutes');
const takedownRoutes = require('./takedownRoutes');
const adminRoutes = require('./adminRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const authRoutes = require('./authRoutes');
const notificationRoutes = require('./notificationRoutes');

router.use('/assets', assetRoutes);
router.use('/infringements', infringementRoutes);
router.use('/takedowns', takedownRoutes);
router.use('/admin', adminRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/auth', authRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router; 