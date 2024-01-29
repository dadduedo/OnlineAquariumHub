import React, { useEffect, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = ({ back }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Paiement effectué!");
					break;
				case "processing":
					setMessage("Votre paiement est en cours de validation.");
					break;
				case "requires_payment_method":
					setMessage(
						"Echec, veuillez ressayer."
					);
					break;
				default:
					setMessage("Erreur.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3000/confirmation",
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occured.");
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} id="payment-form" className="w-full">
			<div className="shadow overflow-hidden sm:rounded-md">
				<div className="px-4 py-5 bg-white sm:p-6">
					<PaymentElement id="payment-element" />
				</div>
				<div className="px-4 py-3 bg-gray-50 flex justify-between items-center sm:px-6">
					<button
						onClick={back}
						className="transition-all duration-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Précedent
					</button>
					<button
						disabled={isLoading || !stripe || !elements}
						type="submit"
						className="transition-all duration-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Valider la commande
					</button>
				</div>
			</div>
		</form>
	);
};

export default PaymentForm;
