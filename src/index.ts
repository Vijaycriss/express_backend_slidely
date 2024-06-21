import express from 'express';
import bodyParser, { json } from 'body-parser';
import { FormSubmission } from './types';
import fs from 'fs';
import path from 'path';


const app = express();
const port = 3000;

app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'submissions.json');


app.get('/', (req, res) =>{
    res.send('Welcome to the Google submission form');
});

// Route to handle get
app.get('/ping', (req, res) => {
    res.json(true);
});

// Helper function to read the JSON file
const readData = (): FormSubmission[] => {
    if (fs.existsSync(dataFilePath)){
        const rawdata = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(rawdata);
    }
    return [];
};

// Helper function to write to the JSON file
const writedata = (data: any) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Route to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, phone, github, stopwatch } = req.body;
    if (!name || !email || !phone || !github || !stopwatch) {
        return res.status(400).send({ error: 'All fields are required' });
    }
    try {

    
        const submissions = readData();

        submissions.push({name, email, phone, github, stopwatch});

        writedata(submissions);

        console.log('Received data: Name - ${Name}, Email - ${email}, Phone - ${phone}, Github - ${github}, stopwatch - ${stopwatch}');

        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
    });

// Route to handle get
app.get('/read', (req, res) => {
    const index = Number(req.query.index);
  
    if (isNaN(index) || index < 0) {
      // Return all submissions if no index is provided
      fs.readFile("src/submissions.json", 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read data' });
        }
  
        try {
          const submissions: FormSubmission[] = JSON.parse(data);
          res.json(submissions);
        } catch (parseError) {
          console.error(parseError);
          res.status(500).json({ error: 'Failed to parse submissions data' });
        }
      });
    } else {
      // Return a single submission by index
      fs.readFile("submissions.json", 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read data' });
        }
  
        try {
          const submissions: FormSubmission[] = JSON.parse(data);
  
          if (index >= submissions.length) {
            return res.status(404).json({ error: 'Submission not found' });
          }
  
          const submission = submissions[index];
          res.json(submission);
        } catch (parseError) {
          console.error(parseError);
          res.status(500).json({ error: 'Failed to parse submissions data' });
        }
      });
    }
  });

// Function to search data by email
const searchdata = (email: string) => {
    const data = readData();
    return data.filter((entry: any) => entry.email === email);
};

// Search endpoint
app.get('/search', (req, res) => {
    const email = req.query.email as string;
    if (!email) {
        return res.status(400).json({ error: 'Email query parameter is required' });
    }
    const result = searchdata(email);
    res.json(result);
});

// Delete endpoint
app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    
    if (isNaN(index) || index < 0) {
        return res.status(400).json({ error: 'Invalid index' });
    }
    fs.readFile("src/submissions.json", 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read data' });
        }
        try {
            const submissions = JSON.parse(data);
            
            if (index >= submissions.length) {
                return res.status(404).json({ error: 'Submission not found' });
            }

            submissions.splice(index, 1);

            fs.writeFile("src/submissions.json", JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to write data' });
                }
                res.json({ message: 'Submission deleted successfully' });
            });
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).json({ error: 'Failed to parse data' });
        }
    });
});
    

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
