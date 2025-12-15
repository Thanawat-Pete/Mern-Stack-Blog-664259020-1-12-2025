import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card.jsx";

const ArticleByAuthor = () => {
  const { author } = useParams();

  const [articles] = React.useState([
    {
      id: 1,
      title: "Meta เปิดยุคใหม่ ‘AI ปลอดภัย’ ดันไทยนำร่อง Meta AI ก่อนทั่วโลก",
      summary:
        "ในช่วงที่ผู้ใช้ทั่วโลกกำลังตั้งคำถามถึงความปลอดภัยของปัญญาประดิษฐ์อย่างเข้มข้น ...",
      author: "bangkokbiznews",
      cover:
        "https://image.bangkokbiznews.com/uploads/images/md/2025/12/4xx0HmLT8DKZe9oz4Ksx.webp?x-image-process=style/LG-webp",
      createAt: "06 ธ.ค. 2025 เวลา 18:52 น.",
    },
    {
      id: 2,
      title: "กสิกรไทย เปิดตัว KBank AI ผู้ช่วยอัจฉริยะ",
      summary:
        "กสิกรไทย เดินหน้าขับเคลื่อนวงการการเงินด้วยนวัตกรรมใหม่ล่าสุด เปิดตัว KBank AI ...",
      author: "bangkokbiznews",
      cover:
        "https://image.bangkokbiznews.com/uploads/images/md/2025/12/DEfSsNqyntjRW9Lbgb3q.webp?x-image-process=style/LG-webp",
      createAt: "06 ธ.ค. 2025 เวลา 18:52 น.",
    },
    {
      id: 3,
      title: "KBTG ประกาศวิสัยทัศน์ Agentic AI ปี 2025",
      summary:
        "AI ยุคใหม่จะทำงานร่วมกับมนุษย์เหมือนเป็นสมาชิกทีมอีกคน ...",
      author: "wuttha",
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      createAt: "05 December 2024 - 21:11",
    },
  ]);

  // 🎯 กรองบทความตาม author
  const filtered = articles.filter((a) => a.author === author);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Title */}
      <div className="flex justify-center mb-8">
        <div className="px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight font-serif">
            บทความทั้งหมดจากผู้เขียน: <span className="text-blue-600">{author}</span>
          </h1>
        </div>
      </div>

      {/* No Article */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg py-20">
          ❗ ไม่พบบทความจากผู้เขียนนี้
        </div>
      )}

      {/* Articles List */}
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        {filtered.map((article, index) => (
          <Card key={article.id} index={index} item={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleByAuthor;
