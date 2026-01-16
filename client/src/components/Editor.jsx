import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { forwardRef, useRef, useImperativeHandle } from "react";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
  }));

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],

    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],

    ["blockquote", "code-block"],
    ["link", "image"],

    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "font",
    "size",

    "bold",
    "italic",
    "underline",
    "strike",

    "color",
    "background",

    "list",
    "indent",
    "align",

    "blockquote",
    "code-block",

    "link",
    "image",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={{
        minHeight: "300px",
        lineHeight: "1.6",
        fontSize: "16px",
      }}
    />
  );
});

export default Editor;
