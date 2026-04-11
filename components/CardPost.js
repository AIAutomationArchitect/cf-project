const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-auto break-words">
          {post.description}
        </div>
      </div>
      <button className="btn btn-square shrink-0">⬆️</button>
    </li>
  );
};

export default CardPost;
