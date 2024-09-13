"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  // Create a router instance
  const router = useRouter();

  // Function to handle button click
  const handleRedirect = () => {
    // Programmatically navigate to the "/about" page
    router.push("/about");
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleRedirect}>Go to About Page</button>
    </div>
  );
}
