"use client";

import toast from "react-hot-toast";

export default function PortfolioButton() {
  const openPortfolio = () => {
    toast.success("Opening Portfolio 🚀");
    window.open("https://nexabuild-abhishek-jatav.netlify.app/", "_blank");
  };

  return (
    <button
      onClick={openPortfolio}
      className="px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold
      bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white
      shadow-md shadow-pink-500/30 hover:scale-105 hover:shadow-pink-500/50
      active:scale-95 transition-all duration-300">
      🚀 Portfolio
    </button>
  );
}
