"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 8000;
app.use(body_parser_1.default.json());
const dataFilePath = path_1.default.join(__dirname, 'submissions.json');
// Route to handle get
app.get('/ping', (req, res) => {
    res.send('pong');
});
// Helper function to read the JSON file
const readData = () => {
    if (fs_1.default.existsSync(dataFilePath)) {
        const rawdata = fs_1.default.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(rawdata);
    }
    return [];
};
// Helper function to write to the JSON file
const writedata = (data) => {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
// Route to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, phone, github } = req.body;
    if (!name || !email || !phone || !github) {
        return res.status(400).send({ error: 'All fields are required' });
    }
    try {
        const submissions = readData();
        submissions.push({ name, email, phone, github });
        writedata(submissions);
        console.log('Received data: Name - ${Name}, Email - ${email}, Phone - ${phone}, Github - ${github}');
        res.status(200).send({ success: true });
    }
    catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
