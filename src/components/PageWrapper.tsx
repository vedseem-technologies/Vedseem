import { useState, useEffect } from "react";
import Hero from "./Hero";

export default function PageWrapper() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black">
          {/* Replace with your own loader */}
          <div className="text-white text-3xl animate-pulse">Loading...</div>
        </div>
      ) : (
        <Hero onNavigate={(page) => console.log(page)} />
      )}
    </div>
  );
}
