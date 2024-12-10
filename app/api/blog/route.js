// http://localhost:3000/api/blog

import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";

export async function POST(req) {
  await connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken ? accessToken.split(" ")[1] : null;

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ message: "POST error (create blog)" }, { status: 500 });
  }
}

export async function GET(req) {
  await connect();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find({})
      .populate({ path: "authorId", select: "-password" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments();

    return NextResponse.json({ blogs, total, page, limit });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
}
