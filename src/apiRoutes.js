const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const conn = mysql.createConnection({
    host: '192.168.10.10',
    user: 'homestead',
    password: 'secret',
    database: 'CRUD'
});

conn.connect((err) => {
    if(err) console.log('MySQL Error: ' + err);
});

router.get('/articles', (req, res) => {
    conn.query('SELECT * FROM articles', (err, results, fields) => {
        if(err) console.log(err);
        res.send(results);
    });
});

router.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    conn.query('SELECT * FROM articles WHERE id=?', [id], (err, results, fields) => {
        if(err) console.log(err);
        res.send(results);
    });
});

router.post('/articles', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO articles (title, text, image) VALUES("' + req.body.title
        + '", "' + req.body.text + '", "' + req.file.filename + '")';
    conn.query(sql, (err, results, fields) => {
        if(err) console.log(err);
        res.send(results);
    });
});

router.delete('/articles/:id', (req, res) => {
    conn.query('SELECT image FROM articles WHERE id=' + req.params.id, (err, results, fields) => {
        if(err) console.log(err);
        fs.unlink('uploads/' + results[0].image, (err) => {
            if(err) console.log(err);
        });
    });

    conn.query('DELETE FROM articles WHERE id=' + req.params.id, (err, results, fields) => {
        if(err) console.log(err);
    });

    conn.query('SELECT * FROM articles', (err, results, fields) => {
        if(err) console.log(err);
        res.send(results);
    });
});

router.put('/articles/:id', upload.single('image'), (req, res) => {
    let sql = 'UPDATE articles SET title=?, text=?, image=? WHERE id=' + req.params.id;
    conn.query(sql, [req.body.title, req.body.text, req.file.filename], (err, results, fields) => {
        if(err) console.log(err);
        res.send(results);
    });
});

router.get('/image/:id', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    fs.createReadStream(path.join('./uploads', req.params.id)).pipe(res);
});

module.exports = router;