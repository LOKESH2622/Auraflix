const express = require('express');
const redis = require('redis');
const axios = require('axios');
const { exec } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Redis client for caching & load balancing
const redisClient = redis.createClient();
redisClient.connect();

// Simulated AI Model for Traffic Prediction
async function predictTraffic() {
    // Call an AI service or run a model to predict peak traffic
    const response = await axios.get('https://ai-traffic-predictor.com/predict');
    return response.data.prediction; // Returns expected traffic load
}

// Smart Load Balancer
async function getBestServer() {
    const servers = ['server1', 'server2', 'server3'];
    let bestServer = servers[0];
    let minLoad = Number.MAX_VALUE;
    
    for (let server of servers) {
        const load = await redisClient.get(server) || 0;
        if (load < minLoad) {
            minLoad = load;
            bestServer = server;
        }
    }
    return bestServer;
}

// API to Handle Incoming Requests
app.get('/stream', async (req, res) => {
    try {
        const bestServer = await getBestServer();
        redisClient.incr(bestServer); // Increase load count

        res.json({ message: `You are connected to ${bestServer}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Traffic Management Error' });
    }
});

// AI-Based Traffic Scaling
setInterval(async () => {
    const predictedLoad = await predictTraffic();
    if (predictedLoad > 80) {
        console.log("High traffic predicted! Scaling up servers...");
        exec('kubectl scale deployment my-streaming-app --replicas=10'); // Auto-scale servers
    }
}, 60000);

app.listen(PORT, () => {
    console.log(`Traffic control running on port ${PORT}`);
});
