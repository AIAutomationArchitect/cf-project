import ButtonDeletePost from "./ButtonDeletePost";

const CardPostAdmin = ({ post }) => {
  return (
    <li className="bg-base-100 p-6 rounded-3xl flex justify-between items-center">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-auto break-words">
          {post.description}
        </div>
      </div>
      <ButtonDeletePost postId={post._id.toString()} />
    </li>
  );
};

export default CardPostAdmin;
