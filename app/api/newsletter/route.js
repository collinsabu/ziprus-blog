import { connect } from "@/lib/db";
import NewsletterSubscription from "@/models/NewsletterSubscription";
import { NextResponse } from "next/server";

// POST: Subscribe to the newsletter
export async function POST(req) {
  await connect();

  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if the email is already subscribed
    const existingSubscription = await NewsletterSubscription.findOne({ email });
    if (existingSubscription) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Save the new subscription
    const subscription = new NewsletterSubscription({ email });
    await subscription.save();

    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all newsletter subscriptions
export async function GET() {
  await connect();

  try {
    const subscriptions = await NewsletterSubscription.find().sort({
      createdAt: -1,
    });
    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error) {
    console.error("GET /api/newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
