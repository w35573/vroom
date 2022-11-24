const express = require('express');
const Stripe = require('stripe');
const { Order } = require('../models/order');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {

    const { checkOutItem } = req.body;

    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cartId: JSON.stringify(checkOutItem._id),
            fullSizeImage: checkOutItem.fullSizeImage,
            carType: checkOutItem.carType,
            fuelType: checkOutItem.fuelType,
            transmission: checkOutItem.transmission,
            name: checkOutItem.name
        },
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ["IN"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'inr',
                    },
                    display_name: 'Free shipping',
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 2,
                        },
                    }
                }
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 150000,
                        currency: 'inr',
                    },
                    display_name: 'Express shipping',
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    }
                }
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: checkOutItem.name,
                        images: [checkOutItem.fullSizeImage],
                        description: "Book your car now",
                        metadata: {
                            id: checkOutItem._id,
                            fuelType: checkOutItem.fuelType,
                            carType: checkOutItem.carType,
                            transmission: checkOutItem.transmission
                        }
                    },
                    unit_amount: checkOutItem.discountedPrice * 100
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        customer: customer.id,
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.send({ url: session.url });
});

// Create Order
const createOrder = async (customer, data) => {
    const products = {
        productId: customer.metadata.cartId,
        quantity: 1,
        imgUrl: customer.metadata.fullSizeImage,
        carType: customer.metadata.carType,
        fuelType: customer.metadata.fuelType,
        transmission: customer.metadata.transmission,
        name: customer.metadata.name
    }

    console.log(data);

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        // console.log(newOrder);
        const savedOrder = await newOrder.save();
        console.log("Processed Order:", savedOrder);
    } catch (err) {
        console.log(err);
    }
};


// Stripe webhook

// whsec_6a3fd9daf30552a4587c62da58766e862358328c1a946ff9a17a4caa137ef891

router.post(
    "/webhook",
    express.raw({ type: 'application/json' }),
    async (req, res) => {
        let data;
        let eventType;

        // Check if webhook signing is configured.

        let webhookSecret;

        if (webhookSecret) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;
            let signature = req.headers["stripe-signature"];

            try {
                event = stripe.webhooks.constructEvent(
                    req.rawBody,
                    signature,
                    webhookSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed:  ${err}`);
                return res.sendStatus(400);
            }
            // Extract the object from the event.
            data = event.data.object;
            eventType = event.type;
        } else {
            // Webhook signing is recommended, but if the secret is not configured in `config.js`,
            // retrieve the event data directly from the request body.
            data = req.body.data.object;
            eventType = req.body.type;

            // console.log(data, eventType);
        }

        // Handle the checkout.session.completed event
        if (eventType === "checkout.session.completed") {
            stripe.customers
                .retrieve(data.customer)
                .then(async (customer) => {
                    try {
                        // CREATE ORDER
                        // console.log("Customer:", customer);
                        createOrder(customer, data);
                    } catch (err) {
                        console.log(typeof createOrder);
                        console.log(err);
                    }
                })
                .catch((err) => console.log(err.message));
        }

        res.status(200).end();
    }
);

module.exports = router;