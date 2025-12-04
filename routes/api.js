// API route module: provides machine-readable endpoints
const e = require('express')
const express = require('express')
const router = express.Router()

// GET /api/books - return all books as JSON
router.get('/books', function (req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE 1=1"
    
    // Add search filter
    if (req.query.search) {
        sqlquery += ` AND (title LIKE '%${req.query.search}%' OR author LIKE '%${req.query.search}%')`
    }
    
    // Add price range filter
    if (req.query.minprice) {
        sqlquery += ` AND price >= ${parseFloat(req.query.minprice)}`
    }
    if (req.query.max_price) {
        sqlquery += ` AND price <= ${parseFloat(req.query.max_price)}`
    }
    
    // Add sort option
    if (req.query.sort === 'name') {
        sqlquery += " ORDER BY title ASC"
    } else if (req.query.sort === 'price') {
        sqlquery += " ORDER BY price ASC"
    }
    
    // Execute the sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.json({ error: err.message || err })
            return next(err)
        }
        else {
            res.json(result)
        }
    })
})

module.exports = router
