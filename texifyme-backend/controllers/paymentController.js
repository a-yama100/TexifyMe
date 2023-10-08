// E:\programming\Project\TexifyMe\texifyme-backend\controllers\paymentController.js

const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

exports.createSubscription = async (req, res) => {
    const { userId, membershipType, paymentMethodId } = req.body;

    // ここで価格IDを設定します。これはStripeダッシュボードで作成したものです。
    const priceId = getPriceIdByMembershipType(membershipType);

    try {
        const customer = await stripe.customers.create({
            payment_method: paymentMethodId,
            email: req.user.email,
            invoice_settings: {
                default_payment_method: paymentMethodId
            }
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent']
        });

        // DBのユーザー情報を更新して会員種別をセットします。
        await User.update({ memberType: membershipType }, {
            where: {
                id: userId
            }
        });

        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

function getPriceIdByMembershipType(membershipType) {
    switch (membershipType) {
        case 1:
            return 'YOUR_PRICE_ID_FOR_MEMBERSHIP_TYPE_1';
        case 2:
            return 'YOUR_PRICE_ID_FOR_MEMBERSHIP_TYPE_2';
        case 3:
            return 'YOUR_PRICE_ID_FOR_MEMBERSHIP_TYPE_3';
        default:
            throw new Error('Invalid membership type');
    }
}
