const axios = require('axios');

class ApiClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,
        });
    }

    async registerRenter(renter) {
        const response = await this.client.post('/register-renter', renter);
        return response.data;
    }

    async registerOwner(owner) {
        const response = await this.client.post('/register-owner', owner);
        return response.data;
    }

    async loginRenter(renter) {
        const response = await this.client.post('/login-renter', renter);
        return response.data;
    }

    async loginOwner(owner) {
        const response = await this.client.post('/login-owner', owner);
        return response.data;
    }

    async findAvailableCars(data) {
        const response = await this.client.post('/find-cars', data);
        return response.data;
    }

    async bookCar(data) {
        const response = await this.client.post('/book-car', data);
        return response.data;
    }

    async startTrip(data) {
        const response = await this.client.post('/start-trip', data);
        return response.data;
    }

    async endTrip(data) {
        const response = await this.client.post('/end-trip', data);
        return response.data;
    }

    async addCar(data) {
        const response = await this.client.post('/register-car', data);
        return response.data;
    }

}

module.exports = ApiClient;