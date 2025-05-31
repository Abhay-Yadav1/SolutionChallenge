const { VertexAI } = require('@google-cloud/vertexai');
const Infringement = require('../models/Infringement');
const Asset = require('../models/Asset');
const { URL } = require('url');

// Initialize Vertex AI
const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT_ID,
    location: 'us-central1'
});

const detectInfringements = async (req, res) => {
    try {
        const { assetId } = req.body;

        // Get the asset details
        const asset = await Asset.findOne({
            _id: assetId,
            owner: req.user._id
        });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Initialize Vertex AI Search
        const searchClient = vertexAI.getSearchClient();

        // Prepare search query based on asset metadata
        const searchQuery = {
            query: asset.name,
            metadata: {
                type: asset.type,
                description: asset.description
            }
        };

        // Perform search using Vertex AI
        const searchResults = await searchClient.search(searchQuery);

        // Process and store infringement results
        const infringements = await Promise.all(
            searchResults.map(async (result) => {
                const url = new URL(result.url);
                const domain = url.hostname;

                // Check if infringement already exists
                const existingInfringement = await Infringement.findOne({
                    asset: assetId,
                    infringingUrl: result.url
                });

                if (existingInfringement) {
                    // Update last seen timestamp
                    existingInfringement.metadata.lastSeen = new Date();
                    await existingInfringement.save();
                    return existingInfringement;
                }

                // Create new infringement record
                const infringement = new Infringement({
                    asset: assetId,
                    owner: req.user._id,
                    infringingUrl: result.url,
                    domain,
                    confidence: result.confidence,
                    matchType: determineMatchType(result.confidence),
                    detectionMethod: 'vertex_ai',
                    metadata: {
                        title: result.title,
                        description: result.description,
                        imageUrl: result.imageUrl,
                        lastSeen: new Date(),
                        firstDetected: new Date()
                    }
                });

                await infringement.save();
                return infringement;
            })
        );

        res.status(200).json({
            message: 'Infringement detection completed',
            infringements
        });
    } catch (error) {
        console.error('Infringement detection error:', error);
        res.status(500).json({ message: 'Error detecting infringements', error: error.message });
    }
};

const getInfringements = async (req, res) => {
    try {
        const { status, domain, matchType, page = 1, limit = 10 } = req.query;

        const query = { owner: req.user._id };
        if (status) query.status = status;
        if (domain) query.domain = domain;
        if (matchType) query.matchType = matchType;

        const infringements = await Infringement.find(query)
            .populate('asset', 'name type url')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Infringement.countDocuments(query);

        res.json({
            infringements,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching infringements', error: error.message });
    }
};

const getInfringementDetails = async (req, res) => {
    try {
        const infringement = await Infringement.findOne({
            _id: req.params.id,
            owner: req.user._id
        }).populate('asset', 'name type url');

        if (!infringement) {
            return res.status(404).json({ message: 'Infringement not found' });
        }

        res.json(infringement);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching infringement details', error: error.message });
    }
};

const updateInfringementStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const infringement = await Infringement.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!infringement) {
            return res.status(404).json({ message: 'Infringement not found' });
        }

        infringement.status = status;
        await infringement.save();

        res.json(infringement);
    } catch (error) {
        res.status(500).json({ message: 'Error updating infringement status', error: error.message });
    }
};

const getInfringementStats = async (req, res) => {
    try {
        const stats = await Infringement.aggregate([
            { $match: { owner: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    domains: { $addToSet: '$domain' }
                }
            }
        ]);

        const domainStats = await Infringement.aggregate([
            { $match: { owner: req.user._id } },
            {
                $group: {
                    _id: '$domain',
                    count: { $sum: 1 },
                    statuses: {
                        $push: '$status'
                    }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        res.json({
            statusStats: stats,
            topDomains: domainStats
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching infringement stats', error: error.message });
    }
};

// Helper function to determine match type based on confidence score
const determineMatchType = (confidence) => {
    if (confidence >= 0.9) return 'exact';
    if (confidence >= 0.7) return 'partial';
    return 'similar';
};

module.exports = {
    detectInfringements,
    getInfringements,
    getInfringementDetails,
    updateInfringementStatus,
    getInfringementStats
}; 