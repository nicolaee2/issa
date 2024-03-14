const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

const users = [
    {
        id: 999,
        email: 'a@g.com',
        password: '123',
        personalId: '123',
    }
];
const unverifiedUsers = [];
let userId = 0;

const owners = [
    {
        id: 998,
        payload: {
            email: 'b@g.com',
            password: '123',
        }

    }
];
const unverifiedOwners = [];
let ownerId = 0;

const cars = [
    {
        id: 999,
        available: true,
        started: false,
    }
];

const secretCarKeys = [
    {
        id: 999,
        secretKey: '123456',
    }
];

let carId = 0;

app.use(express.json());

app.post('/register-renter', (req, res) => {
    const renter = req.body;

    // log renter
    console.log("[INFO] Register renter request " + JSON.stringify(renter));

    // check existence of clientType field
    if (renter.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (renter.clientType !== 1) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (renter.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (renter.messageId !== 0) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!renter.payload) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    // check existing user email
    const existingUser = users.find(user => user.email === renter.payload.email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // check existing personal ID
    const existingPersonalId = users.find(user => user.personalId === renter.payload.personalId);
    if (existingPersonalId) {
        return res.status(400).json({ message: 'Personal ID already exists' });
    }

    // check existing user email
    const existingUnverifiedUser = unverifiedUsers.find(user => user.email === renter.payload.email);
    if (existingUnverifiedUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // check existing personal ID
    const existingUnverifiedPersonalId = unverifiedUsers.find(user => user.personalId === renter.payload.personalId);
    if (existingUnverifiedPersonalId) {
        return res.status(400).json({ message: 'Personal ID already exists' });
    }

    unverifiedUsers.push(renter);
    res.json({ message: 'We will validate your account in the shortest amount of time' });
});

app.post('/register-owner', (req, res) => {
    const owner = req.body;

    // log owner
    console.log("[INFO] Register owner request " + JSON.stringify(owner));

    // check existence of clientType field
    if (owner.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (owner.clientType !== 0) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (owner.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (owner.messageId !== 1) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!owner.payload) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    // check existing user email
    const existingOwner = owners.find(owner => owner.email === owner.payload.email);
    if (existingOwner) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // check existing personal ID
    const existingPersonalId = owners.find(owner => owner.personalId === owner.payload.personalId);
    if (existingPersonalId) {
        return res.status(400).json({ message: 'Personal ID already exists' });
    }

    // check existing user email
    const existingUnverifiedOwner = unverifiedOwners.find(owner => owner.email === owner.payload.email);
    if (existingUnverifiedOwner) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // check existing personal ID
    const existingUnverifiedPersonalId = unverifiedOwners.find(owner => owner.personalId === owner.payload.personalId);
    if (existingUnverifiedPersonalId) {
        return res.status(400).json({ message: 'Personal ID already exists' });
    }

    unverifiedOwners.push(owner);
    res.json({ message: 'We will validate your account in the shortest amount of time' });
});

app.post('/login-renter', (req, res) => {
    const renter = req.body;

    // log renter
    console.log("[INFO] Login renter request " + JSON.stringify(renter));

    // check existence of clientType field
    if (renter.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (renter.clientType !== 1) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (renter.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (renter.messageId !== 6) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!renter.payload) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    // check existing user email
    const existingUser = users.find(user => user.email === renter.payload.email);
    if (!existingUser) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    // check password
    if (existingUser.password !== renter.payload.password) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({ id: existingUser.id });
});

app.post('/login-owner', (req, res) => {
    const owner = req.body;

    // log owner
    console.log("[INFO] Login owner request " + JSON.stringify(owner));

    // check existence of clientType field
    if (owner.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (owner.clientType !== 0) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (owner.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (owner.messageId !== 7) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!owner.payload) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    // check existing user email
    const existingOwner = owners.find(owner => owner.payload.email === owner.payload.email);
    if (!existingOwner) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    // check password
    if (existingOwner.payload.password !== owner.payload.password) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({ id: existingOwner.id });
});

app.post('/verify-renter', (req, res) => {
    // simulate data verification
    setTimeout(() => {
        const renter = unverifiedUsers.shift();

        if (!renter) {
            return res.json({ message: 'No renter to verify' });
        }

        renter.id = userId++;
        users.push(renter);

        // log
        console.log("[INFO] Renter verified " + JSON.stringify(renter));

        res.json({ message: 'Renter verified' });
    }, 1000);
});

app.post('/verify-owner', (req, res) => {
    // simulate data verification
    setTimeout(() => {
        const owner = unverifiedOwners.shift();

        if (!owner) {
            return res.json({ message: 'No owner to verify' });
        }

        owner.id = ownerId++;
        owners.push(owner);

        // log
        console.log("[INFO] Owner verified " + JSON.stringify(owner));

        res.json({ message: 'Owner verified' });
    }, 2000);

});

app.post('/register-car', (req, res) => {
    const car = req.body;

    // log car
    console.log("[INFO] Register car request " + JSON.stringify(car));

    // check existence of clientType field
    if (car.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (car.clientType !== 0) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (car.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (car.messageId !== 8) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!car.payload) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    // convert car id to number
    car.payload.id = parseInt(car.payload.id);

    // check existing car
    const existingCar = cars.find(carExisting => carExisting.id === car.payload.id);
    if (!existingCar) {
        return res.status(400).json({ message: 'Car does not exist' });
    }

    if (existingCar.owner) {
        console.log("[ERROR] Car already registered");
        return res.status(400).json({ message: 'Car already registered' });
    }

    existingCar.owner = car.clientId;
    existingCar.available = true;
    existingCar.started = false;

    for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === car.payload.id) {
            cars[i] = existingCar;
            break;
        }
    }

    // send car report
    try {
        axios.post('http://localhost:3001/owner', car.payload);
        console.log("[INFO] Car report sent");
    } catch (error) {
        console.error("[ERROR] Car report ", error.message);
    }

    res.json({ message: 'Car registered' });
});

app.post('/find-cars', (req, res) => {

    // check request data
    const data = req.body;

    // log
    console.log("[INFO] Find cars request " + JSON.stringify(data));

    if (!data) {
        return res.status(400).json({ message: 'Data is required' });
    }

    if (data.clientId === undefined) {
        return res.status(400).json({ message: 'Client ID is required' });
    }

    if (data.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (data.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (data.messageId !== 2) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    if (data.payload === undefined) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    // check existing user
    const existingUser = users.find(user => user.id === data.clientId);
    if (!existingUser) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    res.json(cars);
});

app.post('/book-car', async (req, res) => {
    const rent = req.body;

    // log rent
    console.log("[INFO] Rent car request " + JSON.stringify(rent));

    // check existence of clientType field
    if (rent.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (rent.clientType !== 1) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (rent.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (rent.messageId !== 3) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!rent.payload) {
        return res.status(400).json({ message: 'Payload is required' });
    }

    rent.payload.carId = parseInt(rent.payload.carId);

    // check existing car
    const existingCar = cars.find(car => car.id === rent.payload.carId);
    if (!existingCar) {
        return res.status(401).json({ message: 'Car does not exist' });
    }

    if (!existingCar.available) {
        return res.status(402).json({ message: 'Car is not available' });
    }

    existingCar.available = false;

    for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === rent.payload.carId) {
            cars[i] = existingCar;
            break;
        }
    }

    try {
        await axios.post('http://localhost:3001/book', {renterId: rent.clientId});
        console.log("[INFO] Car booked");
    } catch (error) {
        console.error("[ERROR] Booking ", error.message);
    }
    res.json({ message: 'Car rented' });

});

app.post('/start-trip', async (req, res) => {
    const ride = req.body;

    // log ride
    console.log("[INFO] Start ride request " + JSON.stringify(ride));

    // check existence of clientType field
    if (ride.clientType === undefined) {
        return res.json({ message: 'Client type is required' });
    }

    if (ride.clientType !== 1) {
        return res.json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (ride.messageId === undefined) {
        return res.json({ message: 'Message ID is required' });
    }

    if (ride.messageId !== 4) {
        return res.json({ message: 'Invalid message ID' });
    }

    // check existence of payload field
    if (!ride.payload) {
        return res.json({ message: 'Payload is required' });
    }

    ride.payload.carId = parseInt(ride.payload.carId);

    // check existing car
    const existingCar = cars.find(car => car.id === ride.payload.carId);
    if (!existingCar) {
        return res.json({ message: 'Car does not exist' });
    }

    if (existingCar.started) {
        return res.json({ message: 'Car is already started' });
    }

    existingCar.renter = ride.clientId;
    existingCar.started = true;

    for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === ride.payload.carId) {
            cars[i] = existingCar;
            break;
        }
    }

    const secretKey = secretCarKeys.find(key => key.id === ride.payload.carId);
    try {
        await axios.post('http://localhost:3001/unlock', {renterId: ride.clientId, secretKey });
        console.log("[INFO] Car unlocked");
    } catch (error) {
        console.error("[ERROR] ", error.message);
    }

    res.json({ message: 'Ride started' });
})

app.post('/end-trip', async (req, res) => {
    const ride = req.body;

    // log ride
    console.log("[INFO] End ride request " + JSON.stringify(ride));

    // check existence of clientType field
    if (ride.clientType === undefined) {
        return res.status(400).json({ message: 'Client type is required' });
    }

    if (ride.clientType !== 1) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    // check existence of messageId field
    if (ride.messageId === undefined) {
        return res.status(400).json({ message: 'Message ID is required' });
    }

    if (ride.messageId !== 5) {
        return res.json({ message: 'Invalid message ID' });
    }

    if (ride.clientId === undefined) {
        return res.json({ message: 'Client ID is required' });
    }

    // check existence of payload field
    if (!ride.payload) {
        return res.json({ message: 'Payload is required' });
    }

    ride.payload.carId = parseInt(ride.payload.carId);

    // check existing car
    const existingCar = cars.find(car => car.id === ride.payload.carId);
    if (!existingCar) {
        return res.json({ message: 'Car does not exist' });
    }

    if (existingCar.renter !== ride.clientId) {
        return res.json({ message: 'Unauthorized' });
    }

    if (!existingCar.started) {
        return res.json({ message: 'Car is not started' });
    }

    existingCar.started = false;
    existingCar.available = true;

    for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === ride.payload.carId) {
            cars[i] = existingCar;
            break;
        }
    }

    const secretKey = secretCarKeys.find(key => key.id === ride.payload.carId);
    try {
        await axios.post('http://localhost:3001/lock', {renterId: ride.clientId, secretKey });
        console.log("[INFO] Car locked");
    } catch (error) {
        console.error("[ERROR] ", error.message);
    }

    try {
        await axios.post('http://localhost:3001/return', {renterId: ride.clientId});
        console.log("[INFO] Car returned");
    } catch (error) {
        console.error("[ERROR] ", error.message);
    }

    res.json({ message: 'Ride ended' });
});

app.post('/car-report', (req, res) => {
    const report = req.body;

    // log report
    console.log("[INFO] Car report request " + JSON.stringify(report));

    // check existing car
    const existingCar = cars.find(car => car.id === report.id);
    if (!existingCar) {
        // create it
        cars.push(report);
        res.json({ message: 'Car report received' });
        return;
    }

    existingCar.speed = report.speed;
    existingCar.battery = report.battery;
    existingCar.model = report.model;
    existingCar.year = report.year;
    existingCar.color = report.color;
    existingCar.location = report.location;
    existingCar.rented = !!report.renter;

    // modify car
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === report.id) {
            cars[i] = existingCar;
            break;
        }
    }

    res.json({ message: 'Car report received' });
});

app.listen(port, () => {
    console.log(`Carsharing app backend listening at http://localhost:${port}`);
});
