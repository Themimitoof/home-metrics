/**
 * Home-metrics Gateway
 * Version: 0.1.0
 * License: MIT
 */

// Import dependencies
var mqtt   = require("mqtt"),
    Influx = require("influx"),
    colors = require("colors"),
    config;


// Try to open config file
try {
    config = require(__dirname + "/config.js");
} catch(err) {
    throw console.error(colors.red("Unable to open the config.js file. Please check if the file exists. \n\tError stack: " + err));
}

// Show startup message
console.info(colors.magenta("Home-metrics Gateway\nVersion: 0.1.0\n"));



/**
 * InfluxDB management
 */

// Configure InfluxDB
var influx = new Influx.InfluxDB({
    host: config.db.server || "influx",
    database: config.db.database,
});

// Create the database on InfluxDB
influx.createDatabase(config.db.database).then((al) => console.info(colors.green("Database creation done.")));



/**
 * MQTT broker management
 */

// Connect to the broker
var broker = mqtt.connect("mqtt://" + config.mqtt.username + ":" + config.mqtt.password + "@" + (config.mqtt.server || "mqttbroker"));


// Get message and subscribe to all topics when the connection to MQTT broker is OK
console.log(colors.yellow("Connectring to MQTT broker..."));
broker.on("connect", () => {
    broker.subscribe(config.mqtt.topics);
    console.info(colors.green("MQTT broker login successful. Waiting messages."));
});


// Insert data when a new message arrives
broker.on("message", (topic, msg) => {
    console.info(colors.yellow("New message from: " + topic + " with value: " + msg.toString()))
    influx.writeMeasurement(topic, [{
            fields: { value: parseFloat(msg.toString()) }
    }]);
});


// Show error message if an error is occured with the MQTT broker
broker.on("error", (err) => console.error(colors.red("An error is occured with the MQTT broker. \t\nError stack: " + err)));



// Uncomment if you need to debug
//setInterval(() => broker.publish("rack-1/temp", (Math.random() * 40).toString()), 10000);