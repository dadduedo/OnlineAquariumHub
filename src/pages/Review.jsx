import React from "react";

const Review = ({ cart }) => { 
	cart = {
        line_items: [
          { 
          id: 1, 
          name: 'Prodotto 1', 
          price: 20, 
          quantity: 2,
          image: { url: 'https://res.cloudinary.com/dakts9ect/image/upload/v1683835731/fcc-family-guys/stewie/stewie-family-guy-fox-1085482_qxxhmu.jpg' },
          selected_options: [{ color: 'blu', size: 'L', option_name: 'Colore', group_name: 'Opzioni' }]
          },
          { 
          id: 2, 
          name: 'Prodotto 2', 
          price: 30, 
          quantity: 1,
          image: { url: 'https://res.cloudinary.com/dakts9ect/image/upload/v1683835731/fcc-family-guys/stewie/stewie-family-guy-fox-1085482_qxxhmu.jpg' },
          selected_options: [{ color: 'blu', size: 'L', option_name: 'Colore', group_name: 'Opzioni' }]
          }],
		  subtotal: { formatted: '40.00' },
		}
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
