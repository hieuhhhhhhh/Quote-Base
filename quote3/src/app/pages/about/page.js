"use client";
import { useState } from "react";
export default function About() {
  const [overlayOn, setOverlayOn] = useState(false);
  const [helloOn, setHelloOn] = useState(false);

  return (
    <div>
      {helloOn && <h2>Hello</h2>}
      <button
        onClick={() => {
          console.log("btn is touched");

          setOverlayOn(true);
        }}
      >
        Overlay On
      </button>
      <button
        onClick={() => {
          setHelloOn(!helloOn);
        }}
      >
        toogle Hello
      </button>
      {overlayOn && (
        <div
          className="overlay"
          onClick={() => {
            console.log("overlay is touched");
          }}
        >
          <button
            onClick={() => {
              setOverlayOn(false);
            }}
          >
            Overlay Off
          </button>
        </div>
      )}
    </div>
  );
}
