"use client";
export default function DemoError({ reset }: { reset: () => void }) {
  return (
    <main style={{ padding: "80px 8%", maxWidth: 700 }}>
      <p>VECTOR VENDING · VIRTUAL EDITION</p>
      <h1 style={{ fontSize: 48 }}>A little pause.</h1>
      <p>The virtual experience could not load. Please try again.</p>
      <button className="button dark" onClick={reset}>
        Try again
      </button>
      <p style={{ marginTop: 24 }}>
        <a href="/">Return to the main site →</a>
      </p>
    </main>
  );
}
