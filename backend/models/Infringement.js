const mongoose = require('mongoose');

const infringementSchema = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    infringingUrl: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    matchType: {
        type: String,
        enum: ['exact', 'partial', 'similar'],
        required: true
    },
    status: {
        type: String,
        enum: ['detected', 'reviewing', 'takedown_requested', 'resolved', 'false_positive'],
        default: 'detected'
    },
    detectionMethod: {
        type: String,
        enum: ['vertex_ai', 'vision_ai', 'manual'],
        required: true
    },
    metadata: {
        title: String,
        description: String,
        imageUrl: String,
        lastSeen: Date,
        firstDetected: {
            type: Date,
            default: Date.now
        }
    },
    takedownRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TakedownRequest'
    }
}, {
    timestamps: true
});

// Indexes for better query performance
infringementSchema.index({ asset: 1, infringingUrl: 1 }, { unique: true });
infringementSchema.index({ owner: 1, status: 1 });
infringementSchema.index({ domain: 1 });
infringementSchema.index({ confidence: -1 });

const Infringement = mongoose.model('Infringement', infringementSchema);

module.exports = Infringement; 