import React, { useState } from "react";
import { api } from "../../../../apis/axios";
import NextPrevArrows from "../../ImageSlidder/NextPrevArrows";
import { toast } from "sonner";

function PublishedRoomCard({ rooms, stripePromise = "" }) {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [checkInDate, setCheckInDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  
  const property_id = localStorage.getItem("property_id");

  const handleSubmit = async (event, room_id, booking_amount) => {
    event.preventDefault();
    setLoading(true);
    if (!checkInDate) {
      toast.error('Please select a check-in date')
      return;
    }

    try {
      console.log(room_id, property_id);

      console.log(room_id, property_id, booking_amount, checkInDate, "Request Data");
      const response = await api.post("booking/create_payment/", {
        room_id: room_id,
        check_in_date: checkInDate,
      });

      const { clientSecret } = await response.data;
      console.log(clientSecret, "secretttt", response.data);

      const stripe = await stripePromise;
      console.log(clientSecret, "secretttt", stripe);
      const { error, success } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setCheckInDate(e.target.value);
    setError(""); // Clear error when date is selected
  };
  return (
    <>
      {rooms?.map((room) => (
        <div
          key={room.id}
          className="border rounded-lg overflow-hidden bg-white shadow-md p-2"
        >
          <div className="flex flex-col md:flex-row">
            {/* image section */}
            <NextPrevArrows room_images={room.room_images} />
            {/* image section */}
            <div className="flex-1 px-4 pt-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{room.room_name}</h3>
                    {room.available_rooms && (
                      <p className="text-red-600 text-sm mt-2">
                        Only {room.available_rooms} beds left!
                      </p>
                    )}
                    <p className="mt-4 text-gray-600">
                      Monthly Rent:{" "}
                      <span className="font-bold text-gray-800">
                        ₹{room.monthly_rent}
                      </span>
                    </p>
                    <p className="mt-4 text-gray-600">
                      Check-in Date:{/* Date Picker */}
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="h-8 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                    </p>
                    
                  </div>
                  <div className="text-right">
                    <div className="mb-14">

                    <p className="text-2xl font-bold">₹{room.monthly_rent}</p>
                    <p className="text-sm text-gray-500">Taxes Not Included</p>
                    </div>
                    {/* Reserve Bed Button */}
                <button
                  className="bg-blue-600  text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={(e) => handleSubmit(e, room.id, room.monthly_rent)}
                  >
                  RESERVE BED
                </button>
                  </div>
                </div>
              </div>
              
            
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PublishedRoomCard;
