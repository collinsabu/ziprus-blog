// File: /pages/newsletter/details.js
"use client";

import React, { useEffect, useState } from "react";

const NewsletterDetails = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/newsletter");
        if (!response.ok) throw new Error("Failed to fetch subscriptions");
        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch subscription details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto my-10 px-6 py-8 max-w-4xl bg-base_color rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-base_text mb-6">
        Newsletter Subscriptions
      </h1>

      {/* Subscription List */}
      {subscriptions.length > 0 ? (
        <ul className="space-y-4">
          {subscriptions.map((sub) => (
            <li
              key={sub._id}
              className="p-4 bg-secondary_color text-white rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-white">{sub.email}</p>
                <p className="text-sm text-white">
                  Subscribed on:{" "}
                  <span className="font-semibold">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-700">No subscriptions found.</p>
      )}
    </div>
  );
};

export default NewsletterDetails;
