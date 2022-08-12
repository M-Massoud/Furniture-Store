const mongoose = require('mongoose');
require('../models/usersModel');
let User = mongoose.model('users');
require('../models/productModel');
let Products = mongoose.model('products');
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51LQaYPH7xAqsB8WshWlLzJ5yHz1vsVFWXZg4M8HimY34jqeulGehRY7ghrZM8IEHywVQIsaSGokP7VPfZgyDy3G000fCheaDX6');

const YOUR_DOMAIN = 'http://localhost:3000';

module.exports.createCheckoutSession = async (request, response, next) => {

    try {

        let checkoutProducts = [];

        for (let cartData of request.body.shoppingCart) {

            const productData = await Products.findOne({ _id: cartData.productId });
            checkoutProducts.push(
                {
                    name: `${productData.name}`,
                    description: productData.description,
                    amount: (productData.price - productData.discount).toFixed(2) * 100,
                    quantity: cartData.quantity,
                    currency: 'egp',
                },
            );
        }

        const user = await User.findOne({ _id: request.id });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            line_items: checkoutProducts,
            client_reference_id: request.body.shoppingCart[0].productId,
            success_url: `${YOUR_DOMAIN}/checkout/success`,
            cancel_url: `${YOUR_DOMAIN}/shoppingCart`,
        });
        response.status(200).json({ status: 'Success', url: session.url, session });
    }
    catch (error) {
        next(error);
    }
}