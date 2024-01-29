import React, { useState, useEffect } from "react";

import AddressForm from "../app/components/Checkout/AddressForm";
import Payment from "../app/components/Checkout/Payment";
import Review from "./Review";

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
	const [page, setPage] = useState(1);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});

	const suivant = () => {
		setPage(2);
	};

	const back = () => {
		setPage(1);
	};

	useEffect(() => {
		// if (cart.id) {
		// 	const generateToken = async () => {
		// 		try {
		// 			const token = await commerce.checkout.generateToken(
		// 				cart.id,
		// 				{
		// 					type: "cart",
		// 				}
		// 			);
		// 			setCheckoutToken(token);
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	};

		// 	generateToken();
		// }
	}, [cart]);

	const nextData = data => {
		setShippingData(data);
		suivant();
	};

	//if (!cart.line_items) return " ";

	return (
		<div className="container mx-auto flex justify-center items-start">
			{page === 1 && (
				<AddressForm suivant={suivant} nextData={nextData} />
			)}
			{page === 2 && (
				<Payment
					checkoutToken={checkoutToken}
					back={back}
					shippingData={shippingData}
					onCaptureCheckout={onCaptureCheckout}
				/>
			)}
			<Review cart={cart} />
		</div>
	);
};

export default Checkout;
