const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

// Environment variables setup
const port = 42069 || process.env.PORT;
const dbHost = "localhost" || process.env.DB_HOST;
const dbPort = 27017 || process.env.DB_PORT;
const dbName = 'owas' || process.env.DB_NAME;

// Express init
console.log("[⏳] - Initializing express...")
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
app.use(cors());

// MongoDB connection
console.log(`[⏳] - Waiting for MongoDB server...`)
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`,{
	useUnifiedTopology: true,
	useNewUrlParser: true,
	}, (err) => {
    err ? console.log(`[❌] - Could not connect to MongoDB server :(`) : console.log(`[✅] - Connected to MongoDBserver!`);
})

// Importing databse models
fs.readdirSync(__dirname + '/Models').forEach((file) => {
	if (~file.indexOf('.js')) {
		require(`${__dirname}/models/${file}`);
		console.log(`[ℹ️] -- Found ${file}, model included.`)
	} else
	console.log(`[❌] -- Found ${file}, not a js file, skipped. Please clean up.`)
})

// Importing Routers
const authRouter = require('./src/routes/auth.routes');
const bikeRouter = require('./src/routes/bikes.routes');
const clientRouter = require('./src/routes/clients.routes');
app.use('/', authRouter);
app.use('/bikes', bikeRouter);
app.use('/clients', clientRouter);

// Sanity check
app.get('/ping', (req, res) => {
    res.status(200).send({response: "pong!"});
})

app.listen(port, () => {
    console.log(`~~ OWAS v0.1 up and running on http://localhost:${port}`);
})