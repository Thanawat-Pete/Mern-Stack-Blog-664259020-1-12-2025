// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import articleService from "../services/article.services";
import Swal from "sweetalert2";

const Home = () => {
  
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getArticles();
        if(response.status === 200){
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
  })

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="flex justify-center mb-8">
        <div className="px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight font-serif">
            SE-NPRU-BLOG : บทความล่าสุด
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 py-6">
        <ArticlesList
          items={articles.map((item, index) => ({
            ...item,
            author: item.author?.username || item.author, 
            index, 
          }))}
        />
      </div>
    </div>
  );
};

export default Home;
