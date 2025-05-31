const Asset = require('../../models/Asset');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);

const uploadAsset = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.file;
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (error) => {
            throw error;
        });

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            const asset = new Asset({
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                url: publicUrl,
                owner: req.user._id
            });

            await asset.save();
            res.status(201).json(asset);
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listAssets = async (req, res) => {
    try {
        const assets = await Asset.find({ owner: req.user._id });
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAsset = async (req, res) => {
    try {
        const asset = await Asset.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Delete from Google Cloud Storage
        const filename = asset.name;
        await bucket.file(filename).delete();

        // Delete from database
        await asset.remove();
        res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'description'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        updates.forEach(update => asset[update] = req.body[update]);
        await asset.save();
        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadAsset,
    listAssets,
    getAsset,
    deleteAsset,
    updateAsset
}; 