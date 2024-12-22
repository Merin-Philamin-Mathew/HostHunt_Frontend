import { api } from "@/apis/axios";
import React, { useState } from "react";
import { toast } from "sonner";

function UserPaymentButton({ id, amount,  stripePromise = "" }) {
  const [loading, setLoading] = useState(false);

  const handleUserPaymentSubmit = async (rent_id, rent_amount) => {
    setLoading(true);

    try {
      console.log(rent_id,'handleuserpayment');

      const response = await api.post("booking/create_rent_payment/", {
        rent_id: rent_id,
      });

      const { clientSecret } = await response.data;
      console.log(clientSecret, "secretttt", response.data);

      const stripe = await stripePromise;
      console.log(clientSecret, "secretttt", stripe);
      const { error, success } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      toast.success("Your Rent Payment was Success!!")
    } catch (err) {
      console.error(err,"Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`bg-green-400 px-8 py-2 rounded-md text-themeColor2li8 flex justify-center items-center`}
        onClick={() => handleUserPaymentSubmit(id, amount)}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.963 7.963 0 014 12H2c0 2.205.896 4.205 2.343 5.657l1.414-1.414z"
            ></path>
          </svg>
        ) : (
          `PAY ${amount}`
        )}
      </button>
    </div>
  );
}

export default UserPaymentButton;
