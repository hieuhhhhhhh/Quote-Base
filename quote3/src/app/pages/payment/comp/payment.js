import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./payment_page.module.css";
import updateAdState from "@/components/ads/helper/update_ad_state";
import { updateMyProfile } from "@/components/redux/action";

export default function PaymentComponent() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const userId = useSelector((state) => state.myProfile.id);
  const dispatch = useDispatch();

  const router = useRouter(); // Next.js router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("Payment Successful!");
    }, 2000);

    dispatch(updateMyProfile({ ads: false }));
    await updateAdState(userId, false);

    // Navigate to the profile page after 300ms after success (not including wait time from await)
    setTimeout(() => {
      router.push(`/pages/profile/${userId}`);
    }, 2300); // Total delay of 2.3 seconds (2000ms + 300ms)
  };

  return (
    <div className={styles.container}>
      <h2>Payment Page</h2>
      <form className={styles.paymentForm} onSubmit={handleSubmit}>
        <label>
          Cardholder Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            pattern="\d{16}"
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>
        <label>
          Expiry Date (MM/YY):
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            pattern="\d{2}/\d{2}"
            placeholder="MM/YY"
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            pattern="\d{3}"
            placeholder="123"
            required
          />
        </label>
        <button type="submit">Pay Now</button>
      </form>

      {paymentStatus && <p className={styles.status}>{paymentStatus}</p>}
    </div>
  );
}
