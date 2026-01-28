"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ deliveryCharge }) => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const finalTotal = totalAmount + deliveryCharge;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onPlaceOrder = async (data) => {
    setLoading(true);
    const orderDetails = {
      customer: data,
      items: items.map((item) => ({ id: item.id, qty: item.quantity })),
      total: finalTotal,
      paymentMethod: data.payment,
    };

    try {
      // Example of an actual API call to save the order
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert("Order Placed Successfully!");
        router.push("/order-success");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onPlaceOrder)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* LEFT SIDE: BILLING & PAYMENT */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("fullName", { required: "Name is required" })}
                className={`input input-bordered w-full ${errors.fullName ? "input-error" : ""}`}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <span className="text-error text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <input
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            <input
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
              placeholder="Phone"
            />
            <input
              {...register("city", { required: true })}
              className="input input-bordered w-full"
              placeholder="City"
            />
          </div>
          <textarea
            {...register("address", { required: true })}
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Address"
            rows={3}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                  className="radio radio-primary"
                  defaultChecked={method === "Cash on Delivery"}
                />
                <span className="font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SUMMARY */}
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
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain rounded border"
              />
              <div className="flex-1">
                <h3 className="text-xs font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-bold">
                ৳{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>৳{deliveryCharge}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-blue-600 border-t pt-3">
            <span>Total</span>
            <span>৳{finalTotal}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={items.length === 0 || loading}
          className={`btn btn-primary w-full mt-6 text-white ${loading ? "loading" : ""}`}
        >
          {loading ? "Processing..." : `Place Order ৳${finalTotal}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
