const ApiClient = require('./Components/ApiClient');
const UI = require('./Components/UI');

const apiClient = new ApiClient('http://localhost:3000');
const ui = new UI(apiClient);

ui.run();
