"use client";

import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatusMessage("Please enter a valid email address.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("Thank you for subscribing!");
        setStatusType("success");
        setEmail(""); // Clear input field
      } else {
        setStatusMessage("Something went wrong. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Something went wrong. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <div>
      <div className="container mx-auto my-10 px-4 py-8 max-w-5xl bg-base_color shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
          {/* Text Section */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-bold text-base_text">
              Subscribe to our Newsletter
            </h2>
            <p className="text-white font-light">
              Stay updated with the latest blog posts and news.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex md:w-1/3 items-stretch">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-base_two rounded-l-lg"
              required
            />
            <button
              type="submit"
              className="bg-base_text text-white px-5 py-3 text-sm hover:bg-opacity-90 flex items-center justify-center rounded-r-lg"
            >
              Subscribe <FaPaperPlane className="ml-2" />
            </button>
          </form>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <p
            className={`mt-4 text-sm ${
              statusType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
