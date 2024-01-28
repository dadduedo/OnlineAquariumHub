import React, { useState, useEffect } from "react";

const Product = ({ product, onAddToCart }) => {
	const [openCard, setOpenCard] = useState(false);

	const toggleOptions = () => {
		setOpenCard(openCard => !openCard);
	};

	const [retrieveColor, setRetrieveColor] = useState([]);
	const [retrieveSize, setRetrieveSize] = useState([]);
	const [emptyOption, setEmptyOption] = useState(false);
	const [added, setAdded] = useState(false);

	const [activeColor, setActiveColor] = useState(null);
	const [activeSize, setActiveSize] = useState(null);

	const colorID = product.variant_groups[0].id;
	const sizeID = product.variant_groups[1].id;

	const [selectOption, setSelectOption] = useState({});

	const fetchColors = async () => {
		setRetrieveColor(await product.variant_groups[0].options);
	};

	const fetchSizes = async () => {
		setRetrieveSize(await product.variant_groups[1].options);
	};

	const changeBtn = () => {
		setEmptyOption(true);
	};

	if (emptyOption) {
		setTimeout(() => {
			setEmptyOption(false);
		}, 3000);
	}

	if (added) {
		setTimeout(() => {
			setAdded(false);
		}, 3000);
	}

	const choosenSize = (id, size) => {
		setSelectOption(selectOption => ({
			...selectOption,
			[sizeID]: id,
		}));
		setActiveSize(size);
	};

	const choosenColor = (id, color) => {
		setSelectOption(selectOption => ({
			...selectOption,
			[colorID]: id,
		}));
		setActiveColor(color);
	};

	useEffect(() => {
		fetchColors();
		fetchSizes();
	});

	return (
		<div className="card2 rounded-2xl">
			<figure>
				<img
					className="product-img"
					src={product.image.url}
					alt={product.name}
				/>
			</figure>
			<section className={openCard ? "details detailsMobile" : "details"}>
				<div
					className={
						openCard
							? "mobile-trigger mobile-trigger-active"
							: "mobile-trigger"
					}
					onClick={toggleOptions}
				>
					<i
						className={
							openCard
								? "fas fa-caret-up toRotate rotation"
								: "fas fa-caret-up toRotate"
						}
					></i>
				</div>
				<div className="flex justify-between items-start mb-5">
					<div className="flex flex-col">
						<h1 className="font-semibold text-black">
							{product.name}
						</h1>
						<span
							dangerouslySetInnerHTML={{
								__html: product.description,
							}}
							className={
								openCard
									? "text-sm font-medium text-gray-800"
									: "text-sm font-medium text-gray-500"
							}
						></span>
					</div>
					<h1 className="text-base font-medium">
						{product.price.formatted} €
					</h1>
				</div>

				<div className="options">
					<div className="options-size">
						<h1 className="font-medium text-black">Tailles</h1>
						<ul className={emptyOption ? "unselected " : ""}>
							{retrieveSize.map(size => (
								<li
									key={size.id}
									onClick={() =>
										choosenSize(size.id, size.name)
									}
									className={
										activeSize === size.name
											? "activeSize w-8 h-8 rounded-full"
											: "w-8 h-8 rounded-full"
									}
								>
									{size.name}
								</li>
							))}
						</ul>
					</div>

					<div className="options-colors">
						<h1 className="font-medium text-black">Couleurs</h1>
						<ul
							className={
								emptyOption
									? "flex items-center justify-start flex-wrap w-full unselected "
									: "flex items-center justify-start flex-wrap w-full"
							}
						>
							{retrieveColor.map(color => (
								<li
									key={color.id}
									className={
										activeColor === color.name
											? "transition-all duration-300 rounded-full w-8 h-8 border-4 border-green-500 " +
											  color.name
											: "transition-all duration-300 rounded-full w-8 h-8 " +
											  color.name
									}
									onClick={() =>
										choosenColor(color.id, color.name)
									}
								></li>
							))}
						</ul>
					</div>
				</div>
				<button
					onClick={
						!activeColor || !activeSize
							? () => changeBtn()
							: () => {onAddToCart(product.id, 1, selectOption); setAdded(true)}
					}
					className={
						emptyOption
							? "transition-all duration-300 w-full flex justify-center items-center px-6 py-2 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-red-600"
							: "transition-all duration-300 w-full flex justify-center items-center px-6 py-2 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
					}
				>
					{emptyOption ? (
						"Choisissez la taille et couleur"
					) : (
						<span>{added ? "ok" : "ajouter au panier"}</span>
					)}
				</button>
			</section>
		</div>
	);
};

export default Product;
