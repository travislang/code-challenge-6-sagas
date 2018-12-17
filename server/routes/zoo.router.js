const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    pool.query(`SELECT "species".*, "class".class_name from "species"
    LEFT OUTER JOIN "class" ON "class".id = "species".class_id
    ORDER BY "species".id ASC;
    `).then( result => {
        res.send(result.rows);
    }).catch( err => {
        console.log('error in GET animals DB query:', err);
        res.sendStatus(500);
    })
    
});

//route to get all of the classes
router.get('/classes', (req, res) => {
    pool.query(`SELECT * FROM "class";`)
    .then( result => {
        res.send( result.rows )
    }).catch( err => {
        console.log('error in GET classes DB query:', err);
        res.sendStatus(500);
    })
})

module.exports = router;