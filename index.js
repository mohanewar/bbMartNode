module.exports = function (app) {
    const loginUser = require('./main.controller.js');


    app.post('/api/v1/login', loginUser.login);
    app.post('/api/v1/addNewUser', loginUser.addNewUser);
    app.post('/api/v1/uploadProducts', loginUser.uploadProducts);
    app.get('/api/v1/getProductList', loginUser.getProductList);
    app.post('/api/v1/updateProducts', loginUser.updateProducts);
    app.post('/api/v1/deleteProduct', loginUser.deleteProduct);






}