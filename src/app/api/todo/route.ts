import { db } from "@/db";
import { posts } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
// import { PgTable } from "drizzle-orm/dist/lib/pg";

export async function PUT(request: Request) {
  const user = await currentUser();
  const body = await request.json();

  if (!user) {
    return Response.json({ message: "Unauthorized access" }, { status: 402 });
  }

  const postId = body.id;

  const updatedData = await db
    .update(posts)
    .set({ name: body.name })
    .where(eq(posts.id, postId));

  return Response.json(updatedData);
}

export async function DELETE(request: Request) {
  const user = await currentUser();
  const body = await request.json();

  if (!user) {
    return Response.json({ message: "Unauthorized access" }, { status: 402 });
  }

  const postId = body.id;

  const deletedData = await db.delete(posts).where(eq(posts.id, postId));

  return Response.json(deletedData);
}

export async function POST(request: Request) {
  const user = await currentUser();
  const body = await request.json();

  if (!user) {
    return Response.json({ message: "Unauthorized access" }, { status: 402 });
  }

  const name = body.name;

  const deletedData = await db.insert(posts).values({ name, userId: user.id });

  return Response.json(deletedData);
}

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized access" }, { status: 402 });
  }

  const deletedData = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, user.id));

  return Response.json(deletedData);
}
