const readline = require('readline');

class UI {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async displayMenu() {
        console.log("Welcome to the Carsharing App");
        console.log("1. Register renter");
        console.log("2. Register owner");
        console.log("3. Login renter");
        console.log("4. Login owner");
        console.log("5. Find available cars");
        console.log("6. Book a car");
        console.log("7. Start a trip");
        console.log("8. End a trip");
        console.log("9. Add a car");
        console.log("10. Exit the app");
        const option = await this.question("Please select an option: ");
        await this.handleMenuOption(option);
    }

    question(query) {
        return new Promise(resolve => {
            this.readline.question(query, resolve);
        });
    }

    async handleMenuOption(option) {
        switch(option) {
            case '1':
                await this.registerRenter();
                break;
            case '2':
                await this.registerOwner();
                break;
            case '3':
                await this.loginRenter();
                break;
            case '4':
                await this.loginOwner();
                break;
            case '5':
                await this.findAvailableCars();
                break;
            case '6':
                await this.bookCar();
                break;
            case '7':
                await this.startTrip();
                break;
            case '8':
                await this.endTrip();
                break;
            case '9':
                await this.addCar();
                break;
            case '10':
                console.log("[INFO] Exiting the app. Goodbye!");
                this.readline.close();
                break;

            default:
                console.log("[ERROR] Invalid option, please try again.");
                await this.displayMenu();
        }
    }

    async registerRenter() {
        // read renter details
        const name = await this.question("Enter your name: ");
        const email = await this.question("Enter your email: ");
        const phone = await this.question("Enter your phone number: ");
        const personalId = await this.question("Enter your personal ID: ");
        const address = await this.question("Enter your address: ");
        const city = await this.question("Enter your city: ");
        const state = await this.question("Enter your state: ");
        const zip = await this.question("Enter your zip code: ");
        const country = await this.question("Enter your country: ");
        const password = await this.question("Enter your password: ");
        const password2 = await this.question("Re-enter your password: ");
        if (password !== password2) {
            console.log("[ERROR] Passwords do not match, please try again.");
        } else {
            // create renter
            const renter = {
                clientType: 1,
                messageId: 0,
                payload: {
                    name,
                    email,
                    phone,
                    personalId,
                    address,
                    city,
                    state,
                    zip,
                    country,
                    password,
                }
            };

            console.log("[INFO] Registering renter: ", renter);

            try {
                const response = await this.apiClient.registerRenter(renter);
                console.log("[INFO] Renter registered: ", response.message);
            } catch (error) {
                console.log("[ERROR] ", error.message);
            }
        }

        this.pressEnterToContinue();
    }

    async registerOwner() {
        // read renter details
        const name = await this.question("Enter your name: ");
        const email = await this.question("Enter your email: ");
        const phone = await this.question("Enter your phone number: ");
        const personalId = await this.question("Enter your personal ID: ");
        const address = await this.question("Enter your address: ");
        const city = await this.question("Enter your city: ");
        const state = await this.question("Enter your state: ");
        const zip = await this.question("Enter your zip code: ");
        const country = await this.question("Enter your country: ");
        const password = await this.question("Enter your password: ");
        const password2 = await this.question("Re-enter your password: ");
        if (password !== password2) {
            console.log("[ERROR] Passwords do not match, please try again.");
        } else {

            // create renter
            const owner = {
                clientType: 0,
                messageId: 1,
                payload: {
                    name,
                    email,
                    phone,
                    personalId,
                    address,
                    city,
                    state,
                    zip,
                    country,
                    password,
                }
            };

            try {
                const response = await this.apiClient.registerOwner(owner);
                console.log("[INFO] Owner registered: ", response.message);
            } catch (error) {
                console.error("[ERROR] ", error.message);
            }
        }
        this.pressEnterToContinue();
    }

    async loginRenter() {
        const email = await this.question("Enter your email: ");
        const password = await this.question("Enter your password: ");

        const req = {
            clientType: 1,
            messageId: 6,
            payload: {
                email,
                password
            }
        }

        try {
            const response = await this.apiClient.loginRenter(req);
            this.renterId = response.id;
            this.renterToken = response.token;
            console.log("[INFO] Login successful, your id is: " + response.id);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }

        this.pressEnterToContinue();
    }

    async loginOwner() {
        const email = await this.question("Enter your email: ");
        const password = await this.question("Enter your password: ");

        const req = {
            clientType: 0,
            messageId: 7,
            payload: {
                email,
                password
            }
        }

        try {
            const response = await this.apiClient.loginOwner(req);
            this.ownerId = response.id;
            this.ownerToken = response.token;
            console.log("[INFO] Login successful, your id is: " + response.id);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }

        this.pressEnterToContinue();
    }

    async findAvailableCars() {
        try {
            const req = {
                clientId: this.renterId,
                clientType: 1,
                messageId: 2,
                payload: {
                    renterToken: this.renterToken
                }
            };

            const response = await this.apiClient.findAvailableCars(req);
            console.log("[INFO] Available cars: ", response);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }
        this.pressEnterToContinue();
    }

    async bookCar() {
        let carId = await this.question("Enter the car ID: ");
        const req = {
            clientId: this.renterId,
            clientType: 1,
            messageId: 3,
            payload: {
                renterToken: this.renterToken,
                carId
            }
        };

        try {
            const response = await this.apiClient.bookCar(req);
            console.log("[INFO]", response.message);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }
        this.pressEnterToContinue();

    }

    async startTrip() {
        let carId = await this.question("Enter the car ID: ");
        const req = {
            clientId: this.renterId,
            clientType: 1,
            messageId: 4,
            payload: {
                renterToken: this.renterToken,
                carId
            }
        };

        try {
            const response = await this.apiClient.startTrip(req);
            console.log("[INFO] Trip started: ", response.message);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }

        this.pressEnterToContinue();
    }

    async endTrip() {
        let carId = await this.question("Enter the car ID: ");
        const req = {
            clientId: this.renterId,
            clientType: 1,
            messageId: 5,
            payload: {
                renterToken: this.renterToken,
                carId
            }
        };

        try {
            const response = await this.apiClient.endTrip(req);
            console.log("[INFO] Trip ended: ", response.message);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }

        this.pressEnterToContinue();
    }

    async addCar() {
        const id = await this.question("Enter the car id: ");

        const req = {
            clientId: this.ownerId,
            clientType: 0,
            messageId: 8,
            payload: {
                id
            }
        };

        try {
            const response = await this.apiClient.addCar(req);
            console.log("[INFO] Car added: ", response.message);
        } catch (error) {
            console.error("[ERROR] ", error.message);
        }

        this.pressEnterToContinue();
    }

    pressEnterToContinue() {
        this.question('\nPress ENTER to continue...')
            .then(() => this.displayMenu());
    }

    run() {
        this.displayMenu().catch(console.error);
    }
}

module.exports = UI;
