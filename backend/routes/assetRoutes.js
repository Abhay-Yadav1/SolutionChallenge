const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {
    uploadAsset,
    listAssets,
    getAsset,
    deleteAsset,
    updateAsset
} = require('../backend/controllers/assetController');

// Asset routes
router.post('/upload', authMiddleware, upload.single('file'), uploadAsset);
router.get('/', authMiddleware, listAssets);
router.get('/:id', authMiddleware, getAsset);
router.delete('/:id', authMiddleware, deleteAsset);
router.patch('/:id', authMiddleware, updateAsset);

module.exports = router; 