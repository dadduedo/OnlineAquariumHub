import React from "react";

import Product from "./Products/Product";

const Products = ({ products, onAddToCart }) => {
	return (
		<div className="container mx-auto flex flex-wrap justify-start items-center">
			{products.map(product => (
				<Product key={product.id} product={product} onAddToCart={onAddToCart}/>
			))}
		</div>
	);
};

export default Products;