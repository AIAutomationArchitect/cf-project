import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";

const getBoard = async (boardId) => {
  await connectMongo();

  console.log("Collection:", Board.collection.name);

  const board = await Board.findById(boardId);

  if (!board) {
    redirect("/");
  }

  return board;
};

export default async function PublicFeedbackBoard({ params }) {
  console.log("PARAM:", params);

  const { boardId } = params;

  const board = await getBoard(boardId);

  // Get board with ObjectID 'boardId'

  return <main>{board.name} (public)</main>;
}
