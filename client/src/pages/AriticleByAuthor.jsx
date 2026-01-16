import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import articleService from "../services/article.services.js";
import Swal from "sweetalert2";
const ArticleByAuthor = () => {
  const { author } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getArticlesByAuthor(author);
        if (response.status === 200) {
          setArticles(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Something went wrong",
          timer: 1500,
          showConfirmButton: true,
        });
      }
    };
    fetchArticles();
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Title */}
      <div className="flex justify-center mb-8">
        <div className="px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight font-serif">
            บทความทั้งหมดจากผู้เขียน:{" "}
            <span className="text-blue-600">
              {articles[0]?.author?.username || ""}
            </span>
          </h1>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        {articles.map((article, index) => (
          <Card
            key={article.id || article._id || index}
            index={index}
            item={article}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleByAuthor;
