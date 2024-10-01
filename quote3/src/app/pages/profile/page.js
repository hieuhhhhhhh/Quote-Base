"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTokenValidation = async () => {
      const res = await fetch("/api/verify_token");
      if (!res.ok) {
        // Handle error response
        const msg = await res.text();
        setMessage(msg);
      } else {
        const msg = await res.text();
        setMessage(msg);
      }
    };

    fetchTokenValidation();
  }, []);

  return (
    <div>
      this is Profile
      <div>The server says: {message}</div>
    </div>
  );
}
