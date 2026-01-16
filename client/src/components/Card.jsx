import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Card = ({ item, index = 0 }) => {
  const navigate = useNavigate();
  if (!item) return null;

  const {
    _id,
    title,
    cover,
    author,
    createdAt,
    summary,
  } = item;

  const isEven = index % 2 === 0;

  // รองรับ author 2 แบบ (string | object)
  const authorName =
    typeof author === "object" ? author?.username : author;

  const authorId =
    typeof author === "object" ? author?._id : null;

  return (
    <div
      onClick={() => navigate(`/article/${_id}`)}
      className={`
        group cursor-pointer flex flex-col sm:flex-row
        bg-white/80 dark:bg-gray-900/60 backdrop-blur 
        border border-gray-200 dark:border-gray-800 
        rounded-2xl overflow-hidden shadow-sm 
        transition-all duration-500 
        hover:shadow-xl hover:-translate-y-1
        ${isEven ? "" : "sm:flex-row-reverse"}
      `}
    >
      {/* รูป */}
      <div className="sm:w-1/3 w-full h-48 sm:h-auto overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-500 
            group-hover:scale-110
          "
        />
      </div>

      {/* เนื้อหา */}
      <div className="sm:w-2/3 p-5 flex flex-col justify-between">
        <div>
          <h2
            className="
              text-xl font-semibold dark:text-gray-100 leading-snug 
              group-hover:text-blue-600 dark:group-hover:text-blue-400 
              transition-colors
            "
          >
            {title}
          </h2>

          {/* Author */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ✍️{" "}
            {authorId ? (
              <Link
                to={`/article/author/${authorId}`}
                onClick={(e) => e.stopPropagation()}
                className="
                  text-blue-600 dark:text-blue-400
                  hover:underline cursor-pointer transition
                "
              >
                {authorName}
              </Link>
            ) : (
              <span>{authorName}</span>
            )}
            {" • "}
            {createdAt
              ? new Date(createdAt).toLocaleDateString("th-TH")
              : ""}
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 line-clamp-3">
            {summary}
          </p>
        </div>

        <span
          className="
            mt-4 text-sm font-medium
            text-blue-600 dark:text-blue-400 
            group-hover:underline transition-all
          "
        >
          อ่านบทความ →
        </span>
      </div>
    </div>
  );
};

export default Card;