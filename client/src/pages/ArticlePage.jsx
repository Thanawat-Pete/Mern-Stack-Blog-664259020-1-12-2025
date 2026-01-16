import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import articleService from "../services/article.services";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const ArticlePage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await articleService.getArticleById(id);
        setArticle(response.data);
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
    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "บทความนี้จะถูกลบถาวร",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        await articleService.deleteArticle(id);
        Swal.fire("ลบสำเร็จ", "", "success");
        navigate("/");
      } catch (err) {
        Swal.fire("เกิดข้อผิดพลาด", err.message, "error");
      }
    }
  };

  const authorId = article.author?._id || article.author;
  const authorName = article.author?.username || article.author;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        {article.cover && (
          <img
            src={article.cover}
            alt={article.title}
            className="w-full max-h-[420px] object-contain bg-gray-100 dark:bg-gray-800 border-b"
          />
        )}

        <div className="p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {article.title}
          </h1>

          <p className="text-gray-500 text-sm mb-6">{article.createdAt}</p>

          <div className="flex items-center gap-2 mb-10">
            <span className="text-gray-600">✍️ ผู้เขียน:</span>

            <Link
              to={`/article/author/${authorId}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {authorName}
            </Link>
          </div>

          <div>
            {userInfo?.id === authorId && (
              <div className="edit-row mb-4 flex items-center justify-center space-x-2">
                <Link
                  to={`/article/edit/${id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>

                <button className="btn btn-error" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
