import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
const mockArticles = [
      {
      id: 1,
      title: "Meta เปิดยุคใหม่ ‘AI ปลอดภัย’ ดันไทยนำร่อง Meta AI ก่อนทั่วโลก",
      content: "ในช่วงที่ผู้ใช้ทั่วโลกกำลังตั้งคำถามถึงความปลอดภัยของปัญญาประดิษฐ์อย่างเข้มข้น ตั้งแต่การใช้ข้อมูลส่วนตัว แชทสนทนา ไปจนถึงภาพที่สร้างขึ้นโดย AI แพลตฟอร์มโซเชียลระดับโลกต่างถูกจับตาว่า ระบบของตน “ปลอดภัยพอหรือไม่?” และโปร่งใสเพียงใด การเปิดงาน “A Weekend with Meta AI x Song Wat” โดย Meta ร่วมกับกรุงเทพมหานคร และสมาคมเมดอินทรงวาด เมื่อวันที่ 30 พฤศจิกายน 2568 ที่ลาน Vintage Vespa Thailand ถนนทรงวาด จึงเป็นโอกาสที่ Meta ให้คำตอบเรื่องความปลอดภัย ก่อนพาผู้ใช้เข้าสู่โลกของฟีเจอร์ AI อย่างเต็มรูปแบบ และประสิทธิภาพ อีกทั้งยังเน้นย้ำถึงความมุ่งมั่นในการพัฒนาเทคโนโลยี AI ที่ปลอดภัยและเป็นประโยชน์ต่อสังคมไทยในระยะยาวของ Meta โดยยังได้มีการประกาศความร่วมมือกับหน่วยงานภาครัฐและเอกชนในประเทศไทย เพื่อส่งเสริมการใช้ AI อย่างรับผิดชอบและโปร่งใส ในอนาคต อันใกล้นี้ Meta มีแผนที่จะเปิดตัวฟีเจอร์ AI ใหม่ๆ ที่ออกแบบมาเพื่อตอบสนองความต้องการของผู้ใช้ไทยอย่างเฉพาะเจาะจง พร้อมทั้งเสริมสร้างความรู้และความเข้าใจเกี่ยวกับการใช้ AI อย่างปลอดภัยผ่านแคมเปญการศึกษาและกิจกรรมต่างๆ ที่จะจัดขึ้นทั่วประเทศ",
      author: "bangkokbiznews",
      cover: "https://image.bangkokbiznews.com/uploads/images/md/2025/12/4xx0HmLT8DKZe9oz4Ksx.webp?x-image-process=style/LG-webp",
      createAt: "06 ธ.ค. 2025 เวลา 18:52 น.",
    }, 
    {
      id: 2,
      title: "กสิกรไทย เปิดตัว KBank AI ผู้ช่วยอัจฉริยะ ตอบโจทย์ทุกไลฟ์สไตล์การเงิน",
      content: "กสิกรไทย เดินหน้าขับเคลื่อนวงการการเงินด้วยนวัตกรรมใหม่ล่าสุด เปิดตัว KBank AI ผู้ช่วยอัจฉริยะที่ผสานพลังของปัญญาประดิษฐ์ (AI) เพื่อยกระดับประสบการณ์การใช้งานด้านการเงินของลูกค้าให้สะดวก รวดเร็ว และปลอดภัยยิ่งขึ้น KBank AI ถูกออกแบบมาเพื่อช่วยเหลือลูกค้าในหลากหลายด้าน ไม่ว่าจะเป็นการให้คำแนะนำทางการเงิน การจัดการบัญชี หรือแม้กระทั่งการตอบคำถามทั่วไปเกี่ยวกับผลิตภัณฑ์และบริการของธนาคาร ด้วยเทคโนโลยี AI ที่ทันสมัย KBank AI สามารถเรียนรู้และปรับตัวตามพฤติกรรมการใช้งานของลูกค้าแต่ละราย ทำให้สามารถให้บริการที่ตรงกับความต้องการเฉพาะบุคคลได้อย่างมีประสิทธิภาพ อีกทั้งยังเน้นย้ำถึงความมุ่งมั่นในการพัฒนาเทคโนโลยี AI ที่ปลอดภัย และส่งเสริมประสบการณ์การใช้งานที่ดีที่สุดให้กับลูกค้าในทุกๆ ด้านของการเงินดิจิทัล ของธนาคารในอนาคต อันใกล้นี้ KBank AI จะมีการอัปเดตฟีเจอร์ใหม่ๆ อย่างต่อเนื่อง เพื่อให้สอดคล้องกับความต้องการและไลฟ์สไตล์ที่เปลี่ยนแปลงไปของลูกค้าในยุคดิจิทัล อย่างแท้จริง นอกจากนี้ K Bank AI ยังได้รับการออกแบบให้มีมาตรการรักษาความปลอดภัยขั้นสูง เพื่อปกป้องข้อมูลส่วนบุคคลและการทำธุรกรรมทางการเงินของลูกค้าอย่างเข้มงวด อีกด้วย ",
      author: "bangkokbiznews",
      cover: "https://image.bangkokbiznews.com/uploads/images/md/2025/12/DEfSsNqyntjRW9Lbgb3q.webp?x-image-process=style/LG-webp  ",
      createAt: "06 ธ.ค. 2025 เวลา 18:52 น.",
    },
    {
      id: 3,
      title: "KBTG ประกาศวิสัยทัศน์ Agentic AI ปี 2025",
      content: "AI ยุคใหม่จะทำงานร่วมกับมนุษย์เหมือนเป็นสมาชิกทีมอีกคน ที่ช่วยขับเคลื่อนองค์กรไปข้างหน้า อย่างมีประสิทธิภาพ และสร้างสรรค์นวัตกรรมใหม่ๆ อย่างไม่สิ้นสุด KBTG ประกาศวิสัยทัศน์ Agentic AI ปี 2025 ชูแนวคิด ‘AI เป็นเพื่อนร่วมทีม’ ที่จะเข้ามาช่วยยกระดับศักยภาพขององค์กรและพนักงานให้ก้าวไปข้างหน้าอย่างมั่นคงและยั่งยืน ในยุคที่ AI กลายเป็นส่วนสำคัญของการทำงานและการใช้ชีวิตประจำวัน KBTG มุ่งมั่นที่จะพัฒนาและนำเทคโนโลยี AI ที่ทันสมัยมาใช้ เพื่อเสริมสร้างประสิทธิภาพการทำงานของพนักงาน และสร้างสรรค์นวัตกรรมใหม่ๆ ที่ตอบโจทย์ความต้องการของลูกค้าได้อย่างครบถ้วน และมีประสิทธิภาพ มากยิ่งขึ้น อันใกล้นี้ KBT  G จะเปิดตัวโครงการและแพลตฟอร์มใหม่ๆ ที่เน้นการใช้ AI ในการพัฒนาผลิตภัณฑ์และบริการต่างๆ ขององค์กรอย่างต่อเนื่อง พร้อมทั้งส่งเสริมการเรียนรู้และพัฒนาทักษะด้าน AI ให้กับพนักงานทุกระดับ เพื่อเตรียมความพร้อมสำหรับการเปลี่ยนแปลงในอนาคตที่ขับเคลื่อนด้วยเทคโนโลยี AI อย่างแท้จริง นอกจากนี้ KBT G ยังให้ความสำคัญกับการพัฒนา AI อย่างมีจริยธรรม และมุ่งมั่นที่จะสร้างสรรค์เทคโนโลยีที่เป็นประโยชน์ต่อสังคมและเศรษฐกิจในระยะยาว อีกด้วย",
      author: "wuttha",
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      createAt: "05 December 2024 - 21:11",
    }
];

const ArticlePage = () => {
  const { id } = useParams();
  const article = mockArticles.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-gray-500 dark:text-gray-400 text-xl">
          ❗ Article not found
        </div>
      </div>
    );
  }

  return (
        <div className="container mx-auto max-w-3xl px-4 py-12">

  {/* 🌈 Modern Card */}
  <div
    className="
      bg-white dark:bg-gray-900
      shadow-lg dark:shadow-xl
      border border-gray-200 dark:border-gray-700
      rounded-2xl
      justify-center
      relative
      overflow-hidden
      transition-all duration-300
    "
  >{/* 📌 Cover Image */}
  {article.cover && (
    <img
      src={article.cover}
      alt={article.title}
      className="
        w-full
        max-h-[420px]
        object-contain
        bg-gray-100 dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
      "
    />
  )}
    {/* INNER CONTENT */}
    <div className="p-8 sm:p-12">

      {/* 🏷️ Title + Date */}
      <h1
        className="
          text-3xl sm:text-4xl font-extrabold
          text-gray-900 dark:text-gray-100
          justify-center 
          tracking-tight leading-tight mb-3
        "
      >
        {article.title}
      </h1>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        {article.createAt}
      </p>

      {/* AUTHOR */}
      <div className="flex items-center gap-2 mb-10 text-sm sm:text-base">
        <span className="text-gray-600 dark:text-gray-400">✍️ ผู้เขียน:</span>
        <Link
          to={`/article/author/${article.author}`}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          {article.author}
        </Link>
      </div>

      {/* CONTENT */}
      <div
        className="
          prose prose-lg dark:prose-invert
          max-w-none leading-relaxed
          prose-img:rounded-xl prose-img:shadow-md
          prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        "
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content)}}
      ></div>

    </div>
  </div>

</div>
  );
};

export default ArticlePage;
