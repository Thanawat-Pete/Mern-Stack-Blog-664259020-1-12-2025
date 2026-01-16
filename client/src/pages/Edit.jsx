import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import articleService from "../services/article.services";
import Editor from "../components/Editor";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    summary: "",
    content: "",
    timestamps: "",
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await articleService.getArticleById(id);
        const article = res.data;

        setFormData({
          title: article.title || "",
          cover: article.cover || "",
          summary: article.summary || "",
          content: article.content || "",
          timestamps: article.timestamps ? article.timestamps.slice(0, 16) : "",
        });

        setLoading(false);
      } catch (error) {
        Swal.fire(
          "เกิดข้อผิดพลาด",
          error.response?.data?.message || error.message,
          "error"
        );
        navigate("/");
      }
    };

    fetchArticle();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await articleService.updateArticle(id, formData);

      await Swal.fire({
        icon: "success",
        title: "แก้ไขบทความสำเร็จ",
      });

      navigate(`/article/${id}`);
    } catch (error) {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">✏️ แก้ไขบทความ</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* COVER */}
          <input
            type="text"
            name="cover"
            className="input input-bordered w-full"
            value={formData.cover}
            onChange={handleChange}
            required
          />

          {/* IMAGE PREVIEW */}
          {formData.cover && (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={formData.cover}
                alt="Preview"
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* SUMMARY */}
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full"
            rows={4}
            value={formData.summary}
            onChange={handleChange}
            required
          />

          {/* TIMESTAMP */}
          <input
            type="datetime-local"
            name="timestamps"
            className="input input-bordered w-full"
            value={formData.timestamps}
            onChange={handleChange}
          />

          {/* CONTENT (Editor) */}
          <Editor
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                content: value,
              }))
            }
          />

          {/* SUBMIT */}
          <button type="submit" className="btn btn-warning w-full">
            💾 บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
