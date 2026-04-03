import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    // 1. Verify the webhook event is from Stripe

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    const { data, type } = event;

    if (type === "checkout.session.completed") {
      // Grant access to the product

      await connectMongo();

      const user = await User.findById(data.object.client_reference_id);

      console.log("client_reference_id: " + data.object.client_reference_id);
      console.log("user found: ", user);

      user.hasAccess = true;
      user.customerId = data.object.customer;

      await user.save();
    } else if (type === "customer.subscription.deleted") {
      await connectMongo();

      const user = await User.findOne({ customerId: data.object.customer });

      user.hasAccess = false;
      await user.save();
    }
  } catch (e) {
    console.error("Stripe error FULL: ", e);
  }

  return NextResponse.json({});
}
