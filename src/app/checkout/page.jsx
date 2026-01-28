import CheckoutForm from "./CheckoutForm";

async function getStoreSettings() {
  const res = await fetch(
    "https://ecommerce-saas-server-wine.vercel.app/api/v1/store/settings",
    {
      headers: { "store-id": "0000126" },
      next: { revalidate: 3600 }, // Cache settings for 1 hour
    },
  );
  const data = await res.json();
  return data?.data || { deliveryCharge: 100 };
}

export default async function CheckoutPage() {
  const settings = await getStoreSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <CheckoutForm deliveryCharge={settings.deliveryCharge} />
    </div>
  );
}
