const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Route for displaying users and search
app.get('/', (req, res) => {
    let search = req.query.search || '';
    search = `%${search}%`; // For LIKE matching

    const sql = 'SELECT * FROM users WHERE name LIKE ? OR email LIKE ?';
    db.query(sql, [search, search], (err, results) => {
        if (err) throw err;
        res.render('index', { users: results, search: req.query.search || '' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
