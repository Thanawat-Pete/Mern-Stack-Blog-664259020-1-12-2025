import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import articleService from "../services/article.services";
import Editor from "../components/Editor";

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    timestamps: "",
    coverPreview: "",
    coverFile: null,
  });

  // text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      coverFile: file,
      coverPreview: URL.createObjectURL(file),
    }));
  };

  // editor
  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("summary", formData.summary);
      data.append("content", formData.content);
      data.append("timestamps", formData.timestamps);

      if (formData.coverFile) {
        data.append("cover", formData.coverFile);
      }

      await articleService.createArticle(data);

      await Swal.fire({
        icon: "success",
        title: "สร้างบทความสำเร็จ 🎉",
      });

      navigate("/");
    } catch (error) {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📝 สร้างบทความใหม่
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="หัวข้อบทความ"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* COVER */}
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
            required
          />

          {/* Preview */}
          {formData.coverPreview && (
            <img
              src={formData.coverPreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* SUMMARY */}
          <textarea
            name="summary"
            placeholder="สรุปบทความ"
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

          {/* CONTENT */}
          <Editor
            ref={editorRef}
            value={formData.content}
            onChange={handleContentChange}
          />

          <button type="submit" className="btn btn-primary w-full">
            🚀 สร้างบทความ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;