const mongoose = require('mongoose');
require('../models/usersModel');
let User = mongoose.model('users');
require('../models/productModel');
let Products = mongoose.model('products');
// This is your test secret API key.
const stripe = require('stripe')(process.env.stripe_secret_key);

const YOUR_DOMAIN = 'http://localhost:3000';

module.exports.createCheckoutSession = async (request, response, next) => {

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

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            line_items: checkoutProducts,
            client_reference_id: request.params.productId,
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
        response.status(200).json({ status: 'Success', url: session.url, session });
    }
    catch (error) {
        next(error);
    }
}