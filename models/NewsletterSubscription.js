// File: /models/NewsletterSubscription.js
import mongoose from "mongoose";

const NewsletterSubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  { timestamps: true }
);

export default mongoose.models.NewsletterSubscription ||
  mongoose.model("NewsletterSubscription", NewsletterSubscriptionSchema);
