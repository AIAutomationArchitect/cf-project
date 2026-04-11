import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import FormAddPost from "@/components/FormAddPost";
import CardPost from "@/components/CardPost";

const getData = async (boardId) => {
  await connectMongo();

  console.log("Collection:", Board.collection.name);

  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ createdAt: -1 });

  if (!board) {
    redirect("/");
  }

  return {
    board,
    posts,
  };
};

export default async function PublicFeedbackBoard({ params }) {
  console.log("PARAM:", params);

  const { boardId } = params;

  const { board, posts } = await getData(boardId);

  // Get board with ObjectID 'boardId'

  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board.name} </h1>
      </section>

      <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row gap-8 pb-12 items-start ">
        <FormAddPost boardId={boardId} />
        <ul className="space-y-4 flex-grow">
          {posts.map((post) => (
            <CardPost key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}
