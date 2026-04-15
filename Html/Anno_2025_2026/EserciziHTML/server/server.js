const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }

        const allowedDevPatterns = [
            /^http:\/\/localhost:\d+$/,
            /^http:\/\/127\.0\.0\.1:\d+$/,
            /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
            /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+:\d+$/
        ];

        const isAllowed = allowedDevPatterns.some((pattern) => pattern.test(origin));

        if (isAllowed) {
            callback(null, true);
            return;
        }

        callback(new Error(`Origin not allowed by CORS: ${origin}`));
    }
}));

app.get("/", (_req, res) => {
    res.send("Backend is running");
});

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "EserciziHTML backend"
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});