import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";

async function getPost(req) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");
  if (!postId) return null;

  await connectMongo();
  return Post.findById(postId);
}

export async function POST(req) {
  const post = await getPost(req);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  post.votesCounter += 1;
  await post.save();

  return NextResponse.json({ votesCounter: post.votesCounter });
}

export async function DELETE(req) {
  const post = await getPost(req);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  post.votesCounter = Math.max(0, post.votesCounter - 1);
  await post.save();

  return NextResponse.json({ votesCounter: post.votesCounter });
}
