"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const deliveryCharge = 100;
  const finalTotal = totalAmount + deliveryCharge;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onPlaceOrder = (data) => {
    const orderDetails = {
      customer: data,
      items: items,
      total: finalTotal,
      paymentMethod: data.payment,
    };
    console.log("Processing Order:", orderDetails);
    alert("Order Placed Successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

<<<<<<< HEAD
      <form
        onSubmit={handleSubmit(onPlaceOrder)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT SIDE: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
=======
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-2 space-y-6">
    
          <div className="bg-base-100 p-6 rounded-xl shadow">
>>>>>>> b21abd357d015a5eefaa82359a8005f0ec285f9d
            <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  {...register("fullName", { required: "Name is required" })}
                  type="text"
                  placeholder="Full Name"
                  className={`input input-bordered w-full ${errors.fullName ? "input-error" : ""}`}
                />
                {errors.fullName && (
                  <span className="text-error text-xs">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email Address"
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                />
              </div>

              <input
                {...register("phone", { required: true })}
                type="tel"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />

              <input
                {...register("city", { required: true })}
                type="text"
                placeholder="City"
                className="input input-bordered w-full"
              />
            </div>

            <textarea
              {...register("address", { required: true })}
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Full Address"
              rows={3}
            ></textarea>
          </div>
<<<<<<< HEAD

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
=======
          
          <div className="bg-base-100 p-6 rounded-xl shadow">
>>>>>>> b21abd357d015a5eefaa82359a8005f0ec285f9d
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {["Cash on Delivery", "bKash", "Nagad"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-50 hover:bg-gray-50"
                >
                  <input
                    {...register("payment")}
                    type="radio"
                    value={method}
                    name="payment"
                    className="radio radio-primary"
                    defaultChecked={method === "Cash on Delivery"}
                  />
                  <span className="font-medium text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-50 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-4 text-blue-900">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 pb-4 border-b border-gray-50 last:border-0"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden border border-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-semibold line-clamp-2 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-gray-700">
                  ৳{item.price * item.quantity}
                </span>
=======
       
        <div className="bg-base-100 p-6 rounded-xl shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

     
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://img.garagepotti.xyz/upload/0000126/cropped-image_893cf0b4.webp"
                alt="product"
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  Walton WD215I10 Monitor
                </h3>
                <p className="text-xs text-gray-500">Qty: 1</p>
>>>>>>> b21abd357d015a5eefaa82359a8005f0ec285f9d
              </div>
            ))}
          </div>

<<<<<<< HEAD
          <div className="border-t mt-4 pt-4 space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
=======
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
>>>>>>> b21abd357d015a5eefaa82359a8005f0ec285f9d
              <span>Subtotal</span>
              <span>৳{totalAmount}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>
              <span>৳{deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-blue-600 border-t pt-3">
              <span>Total Amount</span>
              <span>৳{finalTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className="btn btn-primary w-full mt-6 text-white shadow-lg"
          >
            Place Order ৳{finalTotal}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
