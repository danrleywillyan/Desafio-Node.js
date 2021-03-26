const express = require("express");
const bodyParser = require("body-parser");
// cors provides Express middleware to enable CORS
const cors = require("cors");
// importing db's configuration
const dbConfig = require("./src/config/db.config");

const app = express();

// swagger documentation of api
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'Desafio nodejs',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:8080',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./src/routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// create database object
const db = require('./src/models');
// create Role mongoose object
const Role = db.role;

//mongodb+srv://ninja:Ninj4@cluster0-y3qpm.mongodb.net/rocktseat?retryWrites=true&w=majority
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// home route
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao desafio." });
});

// routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// this function creates the roles in the collection 'roles'
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "seller"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'seller' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
  }