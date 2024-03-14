const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

// report car details to the manufacturer
setInterval(async () => {
    try {
        const response = await axios.post('http://localhost:3000/car-report', car);

        console.log("[INFO] ", response.data);
    } catch (error) {
        console.error("[ERROR] ", error.message);
    }
}, 10000);

const car = {
    id: 998,
    model: "Tesla",
    year: 2020,
    color: "black",
    rented: false,
    owner: null,
    renter: null,
    location: "123, 456",
    speed: 0,
    battery: 65,
}

app.use(express.json());

app.post('/owner', (req, res) => {
    console.log(req.body);
    car.owner = req.body.id;
    console.log("[INFO] Owner registered");
    res.send("Owner registered");
});

app.post('/unlock', (req, res) => {
    console.log("[INFO] Car unlocked");
    res.send("Car unlocked");
});

app.post('/lock', (req, res) => {
    console.log("[INFO] Car locked");
    res.send("Car locked");
});

app.post('/book', (req, res) => {
    // check if car is rented
    if (car.rented) {
        console.log("[ERROR] Car is already rented");
        res.status(400).send("Car is already rented");
    } else {
        car.rented = true;
        car.renter = req.body.renterId;
        console.log("[INFO] Car booked");
        res.send("Car booked");
    }
});

app.post('/return', (req, res) => {

    // check if car is rented
    if (!car.rented) {
        console.log("[ERROR] Car is not rented");
        res.status(400).send("Car is not rented");
    } else {
        car.rented = false;
        car.renter = null;
        console.log("[INFO] Car returned");
        res.send("Car returned");
    }
});

app.listen(port, () => {
    console.log(`[INFO] Car listening at http://localhost:${port}`);
});