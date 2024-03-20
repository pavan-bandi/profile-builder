const express = require('express');
const mysql = require('mysql');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'profilebuilder'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.get('/', (req, res) => {
    res.send("WELCOME");
});


// Route for user signup
app.post('/signup', function(req, res){
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Insert user into MySQL database
    connection.query('INSERT INTO details (email, password) VALUES (?, ?)', [email, password], (error, results, fields) => {
        if (error) {
            console.error('Error signing up user: ', error);
            return res.status(500).json({ message: 'Error signing up user' });
        }
        console.log('User signed up successfully');
        res.status(201).json({ message: 'User signed up successfully' });
    });
});



// Route for user login
app.post('/login', function(req, res){
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists in the database
    connection.query('SELECT * FROM details WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            console.error('Error fetching user from database: ', error);
            return res.status(500).json({ message: 'Error logging in' });
        }

        // If user not found
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored password hash
        const user = results[0];
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If credentials are valid, create a session or JWT token and send it to the client
        // For simplicity, let's just send a success message for now
        res.json({ message: 'Login successful' });
    });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
