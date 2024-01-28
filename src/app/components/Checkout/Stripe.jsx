import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const Stripe = ({checkoutToken, back}) => {
	const [clientSecret, setClientSecret] = useState("");

	const items = {
		items: checkoutToken.live.line_items,
		subtotal: checkoutToken.live.total.formatted,
	};

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: [items] }),
		})
			.then(res => res.json())
			.then(data => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="mt-5 md:mt-0 w-4/5">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<PaymentForm back={back} />
				</Elements>
			)}
		</div>
	);
};

export default Stripe;
