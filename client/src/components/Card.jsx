import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ item, index = 0 }) => {
  const navigate = useNavigate();
  if (!item) return null;

  const { id, title, cover, author, createAt, summary } = item;
  const isEven = index % 2 === 0;

  return (
    <div
      onClick={() => navigate(`/article/${id}`)}
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

          {/* Author กดได้ */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ✍️
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/article/author/${author}`);
              }}
              className="
                text-blue-600 dark:text-blue-400 
                hover:underline cursor-pointer transition
              "
            >
              {author}
            </span>{" "}
            • {createAt}
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 line-clamp-3">
            {summary}
          </p>
        </div>

        <button
          className="
            mt-4 text-sm font-medium
            text-blue-600 dark:text-blue-400 
            group-hover:underline transition-all
          "
        >
          อ่านบทความ →
        </button>
      </div>
    </div>
  );
};

export default Card;

