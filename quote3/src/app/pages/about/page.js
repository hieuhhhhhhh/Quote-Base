// app/page.js
"use client";

import { useEffect, useState } from "react";

export default function About() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setMessage(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Hello World from Next.js!</h1>
      <p>{message}</p>
    </div>
  );
}
