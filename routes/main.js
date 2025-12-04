// Main route module: handles top-level pages like home and about
const express = require("express")
const router = express.Router()
const request = require('request')

// Middleware to require a logged-in session
const redirectLogin = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.redirect('/users/login')
    }
    next()
}

// Home page route - renders `views/index.ejs`
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

// About page route - renders `views/about.ejs`
router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/logout', redirectLogin, (req,res) => {
                req.session.destroy(err => {
                if (err) {
                    return res.redirect('./')
                }
                res.send('you are now logged out. <a href='+'./'+'>Home</a>');
                })
        })


// Weather route - shows a form and, when a city is provided via ?city=, calls OpenWeatherMap
router.get('/weather', function(req, res, next) {
                // Allow city to be supplied via query (?city=...) or default to London
                let apiKey = '8a802be693241533936a7ae1c167ea51'
                let city = req.query.city || 'london'
                let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
                     
                request(url, function (err, response, body) {
                    if(err){
                        next(err)
                    } else {
                        var weather = JSON.parse(body)
                        if (weather!==undefined && weather.main!==undefined) {
                        var wmsg = 'It is '+ weather.main.temp + 
                                ' degrees in '+ weather.name +
                                '! <br> The humidity now is: ' + 
                                weather.main.humidity +
                                '<br> Feels like: ' + weather.main.feels_like +
                                '<br> Min temp: ' + weather.main.temp_min +
                                '<br> Max temp: ' + weather.main.temp_max +
                                '<br> Wind speed: ' + weather.wind.speed;
                        // Simple form + result so the route is interactive while keeping original output logic
                        var html = '<form method="GET" action="/weather">' +
                                             'City: <input type="text" name="city" value="'+ (city) + '" />' +
                                             '<input type="submit" value="Get weather" />' +
                                             '</form><hr>' + wmsg
                        res.send (html);
                        } else {
                            res.send('Error, please try again')
                        }
                    } 
                });
})


// POST handler used to insert a new book record into the database.
// Note: this route duplicates similar functionality in `routes/books.js`.
// It receives `name` and `price` from a submitted form and inserts them.
router.post('/bookadded', function (req, res, next) {
    // preparing SQL to insert a new book
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"
    // parameters come from the form body
    let newrecord = [req.body.name, req.body.price]
    // execute SQL query using the global `db` pool
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            // forward DB errors to Express error handler
            next(err)
        }
        else
            // simple text response confirming the insert
            res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price)
    })
}) 


// Export the router object so `index.js` can mount it
module.exports = router