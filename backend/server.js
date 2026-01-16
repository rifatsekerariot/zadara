const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3009;

app.use(cors());
app.use(express.json());

// Mock Middleware Status - Health Check
app.get('/api/status', (req, res) => {
    res.json({
        status: 'UP',
        mode: 'Enterprise Gateway',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Placeholder for Mock VMware Datacenter Structure
// In the future, this will map Zadara VPSA/Engine data to this format
app.get('/api/vmware/datacenter', (req, res) => {
    res.json([
        {
            id: 'dc-1',
            name: 'Istanbul-DC1',
            children: [ // Standard TreeView expectation
                {
                    id: 'cl-1',
                    name: 'Production-Cluster',
                    type: 'cluster',
                    children: []
                },
                {
                    id: 'cl-2',
                    name: 'DR-Cluster',
                    type: 'cluster',
                    children: []
                }
            ]
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`Middleware running on http://localhost:${PORT}`);
    console.log(`Terminating Zadara API endpoints... Proxying as VMware vCenter.`);
});
