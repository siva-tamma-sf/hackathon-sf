const path = require('path');

const registerRoutes = function(app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    });
    app.post('/createIdea', (req, res) => {
        console.log(req.body," =========>>>>");
    });
}
module.exports = registerRoutes;
