import React, { useState, useEffect } from "react";

import Stripe from "./Stripe";
import Paypal from './Paypal'

const Payment = ({ back, checkoutToken, shippingData, onCaptureCheckout }) => {

	const [radioValue, setRadioValue] = useState(0)

	/* 		const orderData = {
			line_items: checkoutToken.live.line_items,
			customer: {
				firstname: shippingData.firstName,
				lastname: shippingData.lastName,
				email: shippingData.email,
				phone: shippingData.tel,
			},
			shipping: {
				name: "Primary",
				street: shippingData.address,
				town_city: shippingData.city,
				postal_zip_code: shippingData.zip,
				country: "France",
			},
			fulfillment: { shipping_method: "Domestic" },
		};

		onCaptureCheckout(checkoutToken.id, orderData); */

	return (
		<div className="mt-36 flex items-center justify-center w-1/2">
			<div className="flex flex-col items-start w-full">
				<div className="mb-5 w-full">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Payement
						</h3>
						<div class="mt-2">
							<label class="inline-flex items-center">
								<input
									checked={radioValue === 0}
									onClick={() => setRadioValue(0)}
									type="radio"
									class="form-radio"
									name="moyen"
									value="CB"
									defaultChecked
								/>
								<span class="ml-2">CB</span>
							</label>
							<label class="inline-flex items-center ml-6">
								<input
									checked={radioValue === 1}
									onClick={() => setRadioValue(1)}
									type="radio"
									class="form-radio"
									name="moyen"
									value="paypal"
								/>
								<span class="ml-2">Paypal</span>
							</label>
						</div>
					</div>
				</div>
				{radioValue === 0 ? (
					<Stripe checkoutToken={checkoutToken} back={back} />
				) : (
					<Paypal checkoutToken={checkoutToken} back={back} />
				)}
			</div>
		</div>
	);
};

export default Payment;
