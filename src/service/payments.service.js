const { default: Stripe } = require("stripe");
const { APIKEY_STRIPE } = require("../config/config");


class StripeService {
    constructor(){
        this.stripe = new Stripe(APIKEY_STRIPE)
    }
    createPaymentsIntent(data){
        return this.stripe.paymentIntents.create(data)
    }
}
module.exports = new StripeService
