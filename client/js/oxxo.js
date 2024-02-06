document.addEventListener('DOMContentLoaded', async () => {
    const {publishableKey} = await fetch('/config').then((r) => r.json());
    if (!publishableKey) {
      addMessage(
        'No publishable key returned from the server. Please check `.env` and try again'
      );
      alert('Please set your Stripe publishable API key in the .env file');
    }
  
    const stripe = Stripe(publishableKey, {
      apiVersion: '2020-08-27',
    });
  
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const {error: backendError, clientSecret} = await fetch(
        '/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currency: 'mxn',
            paymentMethodType: 'oxxo',
          }),
        }
      ).then((r) => r.json());
  
      if (backendError) {
        addMessage(backendError.message);
        return;
      }
  
      addMessage(`Client secret returned.`);
  
      const nameInput = document.querySelector('#name');
      const emailInput = document.querySelector('#email');
  
      // Confirm the payment given the clientSecret from the payment intent that
      // was just created on the server.
      const {error: stripeError, paymentIntent} = await stripe.confirmOxxoPayment(
        clientSecret,
        {
          payment_method: {
            billing_details: {
              name: nameInput.value,
              email: emailInput.value,
            },
          },
        }
      );
  
      if (stripeError) {
        addMessage(stripeError.message);
        return;
      }
  
      addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  
      // When passing {any_prefix}succeed_immediately@{any_suffix}
      // as the email address in the billing details, the payment
      // intent will succeed after 3 seconds. We set this timeout
      // to refetch the payment intent.
      const i = setInterval(async () => {
        const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);
        addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
        if (paymentIntent.status === 'succeeded') {
          clearInterval(i);
        }
      }, 500);
    });
  });