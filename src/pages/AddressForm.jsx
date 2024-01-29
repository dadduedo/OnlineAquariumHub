import React from "react";
import { useForm } from "react-hook-form";

export default function AddressForm({ nextData }) {
  const {
		register,
		handleSubmit
  } = useForm();

  const onSubmit = data => nextData(data);

	return (
		<div className="mt-36 flex items-center justify-center w-1/2">
			<div className="flex flex-col items-start w-full">
				<div className="mb-5">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Vos cordoonnées
						</h3>
					</div>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="px-4 py-5 bg-white sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="firstName"
											className="block text-sm font-medium text-gray-700"
										>
											Votre prénom
										</label>
										<input
											{...register("firstName", {
												required: true,
											})}
											type="text"
											name="firstName"
											id="firstName"
											autoComplete="given-name"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="lastName"
											className="block text-sm font-medium text-gray-700"
										>
											Votre nom
										</label>
										<input
											{...register("lastName", {
												required: true,
											})}
											type="text"
											name="lastName"
											id="lastName"
											autoComplete="family-name"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-4">
										<label
											htmlFor="email-address"
											className="block text-sm font-medium text-gray-700"
										>
											Votre email
										</label>
										<input
											{...register("email", {
												required: true,
											})}
											type="email"
											name="email"
											id="email"
											autoComplete="email"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3 lg:col-span-2">
										<label
											htmlFor="tel"
											className="block text-sm font-medium text-gray-700"
										>
											Téléphone
										</label>
										<input
											{...register("tel", {
												required: true,
											})}
											type="tel"
											name="tel"
											id="tel"
											autoComplete="tel"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="country"
											className="block text-sm font-medium text-gray-700"
										>
											Pays
										</label>
										<select
											disabled
											id="country"
											name="country"
											autoComplete="country-name"
											className="cursor-not-allowed disabled:opacity-50 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											<option
												value="France"
												{...register("country")}
											>
												France
											</option>
										</select>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="city"
											className="block text-sm font-medium text-gray-700"
										>
											Ville
										</label>
										<input
											{...register("city", {
												required: true,
											})}
											type="text"
											name="city"
											id="city"
											autoComplete="address-level2"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-4">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium text-gray-700"
										>
											Adresse
										</label>
										<input
											{...register("address", {
												required: true,
											})}
											type="text"
											name="address"
											id="address"
											autoComplete="street-address"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3 lg:col-span-2">
										<label
											htmlFor="postal-code"
											className="block text-sm font-medium text-gray-700"
										>
											Code postal
										</label>
										<input
											{...register("zip", {
												required: true,
											})}
											type="text"
											name="zip"
											id="zip"
											autoComplete="postal-code"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
									</div>
								</div>
							</div>
							<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
								<button
									type="submit"
									className="transition-all duration-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Suivant
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
