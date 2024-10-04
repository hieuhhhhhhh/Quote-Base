"use client";

import { useEffect, useState } from "react";

export default function Token_check() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTokenValidation = async () => {
      console.log("(token_check): Fetching...");

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

  return <div>The server says: {message}</div>;
}
