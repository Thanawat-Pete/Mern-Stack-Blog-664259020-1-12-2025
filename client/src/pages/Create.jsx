import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import articleService from "../services/article.services";
import Editor from "../components/Editor";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
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
      let coverUrl = "";
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
          <div>
            <label className="label">
              <span className="label-text">หัวข้อบทความ</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="หัวข้อบทความ"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* COVER */}
          <div>
            <label className="label">
              <span className="label-text">ภาพปก</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Preview */}
          {formData.coverPreview && (
            <div className="border rounded-lg overflow-hidden max-w-md mx-auto">
              <img
                src={formData.coverPreview}
                alt="Preview"
                className="w-full h-64 object-contain"
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
              placeholder="สรุปบทความ"
              className="textarea textarea-bordered w-full"
              rows={4}
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="label">
              <span className="label-text">เนื้อหาบทความ</span>
            </label>
            <Editor
              ref={editorRef}
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            🚀 สร้างบทความ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;