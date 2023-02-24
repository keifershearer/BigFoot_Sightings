// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const path = require('path')
const app = express();


hbs.registerPartials(path.join(__dirname, 'views', 'Partials'))
app.use(express.static(path.join(__dirname, 'public')))
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
app.use(require('./middleware/exposeUserToView'));



// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "BigFoot-Sightings";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
