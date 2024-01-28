/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Link from 'next/link';

export default function Cart({
	cart,
	openCart,
	toggleCloseCart,
	handleRemoveFromCart,
	handleCartQty,
}) {

	if (!cart.line_items) return " ";

	console.log(cart.line_items)

	return (
		<Transition.Root show={openCart} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 overflow-hidden"
				onClose={toggleCloseCart}
			>
				<div className="absolute inset-0 overflow-hidden">
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="w-screen max-w-md">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<Dialog.Title className="text-lg font-medium text-gray-900">
												Votre panier
											</Dialog.Title>
											<div className="ml-3 h-7 flex items-center">
												<button
													type="button"
													className="-m-2 p-2 text-gray-400 hover:text-gray-500"
													onClick={toggleCloseCart}
												>
													<span className="sr-only">
														Close panel
													</span>
													<XIcon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</button>
											</div>
										</div>

										<div className="mt-8">
											<div className="flow-root">
												<ul className="-my-6 divide-y divide-gray-200">
													{!cart.line_items.length ? (
														<li className="mt-8 text-lg font-normal text-gray-400">
															Votre panier est
															vide
														</li>
													) : (
														cart.line_items.map(
															product => (
																<li
																	key={
																		product.id
																	}
																	className="py-6 flex"
																>
																	<div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
																		<img
																			src={
																				product.image.url
																			}
																			alt={
																				product.name
																			}
																			className="w-full h-full"
																		/>
																	</div>

																	<div className="ml-4 flex-1 flex flex-col">
																		<div>
																			<div className="flex justify-between ">
																				<div>
																					<h1 className="text-base font-medium text-gray-900">
																						{
																							product.name
																						}
																					</h1>
																					<div className="flex flex-col items-start justify-start text-xs font-medium text-gray-400">
																						{product.selected_options.map(
																							prod => (
																								<div
																									key={
																										prod.option_name
																									}
																								>
																									<p>
																										{
																											prod.group_name
																										}{" "}
																										:{" "}
																										{
																											prod.option_name
																										}
																									</p>
																								</div>
																							)
																						)}
																					</div>
																				</div>
																				<p className="ml-4">
																					{
																						product
																							.price
																							.formatted
																					}{" "}
																					€
																				</p>
																			</div>
																			<p className="mt-1 text-sm text-gray-500">
																				{
																					product.color
																				}
																			</p>
																		</div>
																		<div className="flex-1 flex items-end justify-between text-sm">
																			<p className="text-gray-500 font-semibold">
																				Quantité
																				:{" "}
																				<button
																					className="mr-2"
																					onClick={() =>
																						handleCartQty(
																							product.id,
																							product.quantity -
																								1
																						)
																					}
																				>
																					<i className="far fa-minus-square"></i>
																				</button>
																				{
																					product.quantity
																				}
																				<button
																					className="ml-2"
																					onClick={() =>
																						handleCartQty(
																							product.id,
																							product.quantity +
																								1
																						)
																					}
																				>
																					<i className="far fa-plus-square"></i>
																				</button>
																			</p>

																			<div className="flex">
																				<button
																					type="button"
																					className="font-medium text-indigo-600 hover:text-indigo-500"
																					onClick={() =>
																						handleRemoveFromCart(
																							product.id
																						)
																					}
																				>
																					Effacer
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															)
														)
													)}
												</ul>
											</div>
										</div>
									</div>

									<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
										<div className="flex justify-between text-base font-medium text-gray-900">
											<p>Subtotal</p>
											<p>
												{!cart.line_items
													? "0.00 "
													: cart.subtotal
															.formatted}{" "}
												€
											</p>
										</div>
										<div className="mt-6">
											<Link
												to={
													!cart.line_items.length
														? "/shop"
														: "/checkout"
												}
												onClick={toggleCloseCart}
											>
												<span className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
													Commander
												</span>
											</Link>
										</div>
										<div className="mt-6 flex justify-center text-sm text-center text-gray-500">
											<p>
												ou{" "}
												<button
													type="button"
													className="text-indigo-600 font-medium hover:text-indigo-500"
													onClick={toggleCloseCart}
												>
													Continuez le shopping
													<span aria-hidden="true">
														{" "}
														&rarr;
													</span>
												</button>
											</p>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
