import React from "react";

const Review = ({ cart }) => {
	return (
		<div className="w-1/4 ml-10 mt-36">
			<h3 className="text-lg font-medium leading-6 text-gray-900">
				Votre commande
			</h3>
			<div className="bg-gray-200 p-5 pt-2 rounded-xl mt-5">
				{cart.line_items.map(product => (
					<div className="flex justify-between py-4 border-b border-gray-600 border-opacity-10" key={product.name}>
						<div>
							<h2 className="font-medium text-base">
								{product.name}
							</h2>
							<div className="flex">
								<h5 className="font-medium text-xs text-gray-500 mt-1">
									Quantité : {product.quantity}
								</h5>
								{product.selected_options.map(prod => (
									<h5 className="font-medium text-xs text-gray-500 mt-1 ml-3" key={product.name}>						
										{prod.group_name} :{" "}
										{prod.option_name}
									</h5>
								))}
							</div>
						</div>
						<h3 className="font-medium text-base">
							{product.price.formatted} €
						</h3>
					</div>
				))}
				<div className="flex justify-between items-center mt-5">
					<h4 className="font-medium text-base">Total : </h4>
					<p className="font-bold text-sm">
						{cart.subtotal.formatted} €
					</p>
				</div>
			</div>
		</div>
	);
};

export default Review;
