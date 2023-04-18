import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormComponent,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, SetIsProcessingPayment] = useState(false);

  const paymentHandeler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    SetIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const payemntResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    SetIsProcessingPayment(false);

    if (payemntResult.error) {
      alert(payemntResult.error.message);
    } else {
      if (payemntResult.paymentIntent.status === "succeeded") {
        alert("Payment Successfull");
      }
    }
  };

  return (
    <PaymentFormComponent>
      <FormContainer onSubmit={paymentHandeler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormComponent>
  );
};

export default PaymentForm;
