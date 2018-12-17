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
//route to add new animal to db
router.post('/', (req, res) => {
    let sqlText = `INSERT INTO "species"("species_name", "class_id")
    VALUES($1, $2);`;
    pool.query(sqlText, [req.body.name, req.body.class])
    .then( () => {
        res.sendStatus(201);
    }).catch( err => {
        console.log('error in POST animal DB query:', err);
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