import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import articleService from "../services/article.services";
import Editor from "../components/Editor";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    summary: "",
    content: "",
    coverFile: null,
    coverPreview: "",
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
          coverPreview: article.cover || "",
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

  // upload file to Supabase
  const uploadFile = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`upload/${fileName}`, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(`upload/${fileName}`);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let coverUrl = formData.cover;
      if (formData.coverFile) {
        coverUrl = await uploadFile(formData.coverFile);
        if (!coverUrl) {
          Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถอัปโหลดไฟล์ได้", "error");
          return;
        }
      }

      const data = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        cover: coverUrl,
      };

      await articleService.updateArticle(id, data);

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
          <div>
            <label className="label">
              <span className="label-text">หัวข้อบทความ</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* COVER */}
          <div>
            <label className="label">
              <span className="label-text">ภาพปก (อัปโหลดใหม่หรือใช้เดิม)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {formData.coverPreview && (
            <div className="border rounded-lg overflow-hidden max-w-md mx-auto">
              <img
                src={formData.coverPreview}
                alt="Preview"
                className="w-full h-64 object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* SUMMARY */}
          <div>
            <label className="label">
              <span className="label-text">สรุปบทความ</span>
            </label>
            <textarea
              name="summary"
              className="textarea textarea-bordered w-full"
              rows={4}
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONTENT (Editor) */}
          <div>
            <label className="label">
              <span className="label-text">เนื้อหาบทความ</span>
            </label>
            <Editor
              value={formData.content}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  content: value,
                }))
              }
            />
          </div>

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
