const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware to parse large JSON payloads (up to 50MB for artwork/avatar base64 uploads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Default Database Seed Data
const DEFAULT_DATABASE = {
    profile: {
        name: "Aesthete",
        bio: "Amidst the silence of the gallery, I find the echoes of distant worlds. Curator of light, shadow, and the spaces between words.",
        avatar: "https://lh3.googleusercontent.com/aida/ADBb0ugNErUfyEWDvSJHYEhHX61AaSnrzwNj0ker8nxV8AVCLFjSTf1mnCB-j4AcsRw8KzepabZrkQVk0xTI0EX30TQ4wBbsoX-KeHN77rDw8_-CqO6cNeWzfR3rK-h_4mbwCtl39S_cxX5TG_JfdKE5oZrL2ZsdyZLohbIVVTvwOBFbbTWSKzKJJrJLp9otkby3HCqiI8Gz33V_uyBeZj-IhiwCbOr1K4waprgjlWVpK1LGkZOPC9FK__pe5w"
    },
    essays: [],
    artworks: [],
    deleted_essays: [],
    deleted_artworks: [],
    messages: [],
    deleted_messages: []
};

// Read Database Helper
function getDatabase() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const fileData = fs.readFileSync(DB_FILE, 'utf8');
            return JSON.parse(fileData);
        }
    } catch (err) {
        console.error("Error reading database file, using fallback:", err);
    }
    // Initialize file on first run
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATABASE, null, 4), 'utf8');
    return DEFAULT_DATABASE;
}

// Write Database Helper (Atomic write using a temporary file to avoid data corruption)
function saveDatabase(data) {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 4), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
}

// API Save Route: Save the full database payload in one call
app.post('/api/save', (req, res) => {
    try {
        const payload = req.body;
        if (!payload || typeof payload !== 'object') {
            return res.status(400).json({ error: 'Invalid payload' });
        }
        
        const currentDb = getDatabase();
        
        // Merge or replace profile, essays, and artworks safely
        const updatedDb = {
            profile: payload.profile || currentDb.profile,
            essays: Array.isArray(payload.essays) ? payload.essays : currentDb.essays,
            artworks: Array.isArray(payload.artworks) ? payload.artworks : currentDb.artworks,
            deleted_essays: Array.isArray(payload.deleted_essays) ? payload.deleted_essays : currentDb.deleted_essays,
            deleted_artworks: Array.isArray(payload.deleted_artworks) ? payload.deleted_artworks : currentDb.deleted_artworks,
            messages: Array.isArray(payload.messages) ? payload.messages : currentDb.messages,
            deleted_messages: Array.isArray(payload.deleted_messages) ? payload.deleted_messages : currentDb.deleted_messages
        };
        
        saveDatabase(updatedDb);
        console.log(`[Database] Synced successfully at ${new Date().toISOString()}`);
        res.json({ success: true });
    } catch (err) {
        console.error("Error saving database payload:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Dynamic Injection Handler for served HTML pages
function injectDatabaseAndSend(filePath, res) {
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Page Not Found');
    }
    try {
        let html = fs.readFileSync(filePath, 'utf8');
        const dbData = getDatabase();
        
        // Inject the server's db state in the head of the document
        const injection = `\n<script>window.__CMS_DATA__ = ${JSON.stringify(dbData)};</script>\n`;
        html = html.replace('<head>', `<head>${injection}`);
        
        res.send(html);
    } catch (err) {
        console.error("Error serving page with database injection:", err);
        res.status(500).send('Internal Server Error');
    }
}

// Handle root path /
app.get('/', (req, res) => {
    injectDatabaseAndSend(path.join(__dirname, 'index.html'), res);
});

// Handle other HTML page requests specifically to perform dynamic DB injection
app.get('/*.html', (req, res) => {
    // Prevent directory traversal or malicious relative paths
    const fileName = path.basename(req.path);
    const filePath = path.join(__dirname, fileName);
    injectDatabaseAndSend(filePath, res);
});

// Serve all other static assets (CSS, JS, images, icons)
app.use(express.static(__dirname));

// Fallback 404 Handler
app.use((req, res) => {
    res.status(404).send('Curated Aesthetic Error: 404 Not Found');
});

// Start Server
app.listen(PORT, () => {
    console.log('\n==================================================');
    console.log(`   Ethereal Curator CMS Server is now active!`);
    console.log(`   Local URL:   http://localhost:${PORT}`);
    console.log(`   Database:    ${DB_FILE}`);
    console.log('==================================================\n');
});
