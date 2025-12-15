import React from "react";
import Card from "../components/Card.jsx";

const Home = () => {
  const [articles, setArticles] = React.useState([
    {
      id: 1,
      title: "Meta เปิดยุคใหม่ ‘AI ปลอดภัย’ ดันไทยนำร่อง Meta AI ก่อนทั่วโลก",
      summary: "ในช่วงที่ผู้ใช้ทั่วโลกกำลังตั้งคำถามถึงความปลอดภัยของปัญญาประดิษฐ์อย่างเข้มข้น ตั้งแต่การใช้ข้อมูลส่วนตัว แชทสนทนา ไปจนถึงภาพที่สร้างขึ้นโดย AI แพลตฟอร์มโซเชียลระดับโลกต่างถูกจับตาว่า ระบบของตน “ปลอดภัยพอหรือไม่?” และโปร่งใสเพียงใด การเปิดงาน “A Weekend with Meta AI x Song Wat” โดย Meta ร่วมกับกรุงเทพมหานคร และสมาคมเมดอินทรงวาด เมื่อวันที่ 30 พฤศจิกายน 2568 ที่ลาน Vintage Vespa Thailand ถนนทรงวาด จึงเป็นโอกาสที่ Meta ให้คำตอบเรื่องความปลอดภัย ก่อนพาผู้ใช้เข้าสู่โลกของฟีเจอร์ AI อย่างเต็มรูปแบบ",
      author: "bangkokbiznews",
      cover: "https://image.bangkokbiznews.com/uploads/images/md/2025/12/4xx0HmLT8DKZe9oz4Ksx.webp?x-image-process=style/LG-webp",
      createAt: "06 ธ.ค. 2025 เวลา 18:52 น.",
    }, 
    {
      id: 2,
      title: "กสิกรไทย เปิดตัว KBank AI ผู้ช่วยอัจฉริยะ ตอบโจทย์ทุกไลฟ์สไตล์การเงิน",
      summary: "กสิกรไทย เดินหน้าขับเคลื่อนวงการการเงินด้วยนวัตกรรมใหม่ล่าสุด เปิดตัว KBank AI ผู้ช่วยอัจฉริยะที่ผสานพลังของปัญญาประดิษฐ์ (AI) เพื่อยกระดับประสบการณ์การใช้งานด้านการเงินของลูกค้าให้สะดวก รวดเร็ว และปลอดภัยยิ่งขึ้น KBank AI ถูกออกแบบมาเพื่อช่วยเหลือลูกค้าในหลากหลายด้าน ไม่ว่าจะเป็นการให้คำแนะนำทางการเงิน การจัดการบัญชี หรือแม้กระทั่งการตอบคำถามทั่วไปเกี่ยวกับผลิตภัณฑ์และบริการของธนาคาร ด้วยเทคโนโลยี AI ที่ทันสมัย KBank AI สามารถเรียนรู้และปรับตัวตามพฤติกรรมการใช้งานของลูกค้าแต่ละราย ทำให้สามารถให้บริการที่ตรงกับความต้องการเฉพาะบุคคลได้อย่างมีประสิทธิภาพ",
      author: "bangkokbiznews",
      cover: "https://image.bangkokbiznews.com/uploads/images/md/2025/12/DEfSsNqyntjRW9Lbgb3q.webp?x-image-process=style/LG-webp  ",
      createAt: "06 ธ.ค. 2025 เวลา 18:52 น.",
    },
    {
      id: 3,
      title: "KBTG ประกาศวิสัยทัศน์ Agentic AI ปี 2025",
      summary: "AI ยุคใหม่จะทำงานร่วมกับมนุษย์เหมือนเป็นสมาชิกทีมอีกคน ที่ช่วยขับเคลื่อนองค์กรไปข้างหน้า อย่างมีประสิทธิภาพ และสร้างสรรค์นวัตกรรมใหม่ๆ อย่างไม่สิ้นสุด KBTG ประกาศวิสัยทัศน์ Agentic AI ปี 2025 ชูแนวคิด ‘AI เป็นเพื่อนร่วมทีม’ ที่จะเข้ามาช่วยยกระดับศักยภาพขององค์กรและพนักงานให้ก้าวไปข้างหน้าอย่างมั่นคงและยั่งยืน ในยุคที่ AI กลายเป็นส่วนสำคัญของการทำงานและการใช้ชีวิตประจำวัน KBTG มุ่งมั่นที่จะพัฒนาและนำเทคโนโลยี AI ที่ทันสมัยมาใช้ เพื่อเสริมสร้างประสิทธิภาพการทำงานของพนักงาน และสร้างสรรค์นวัตกรรมใหม่ๆ ที่ตอบโจทย์ความต้องการของลูกค้าได้อย่างครบถ้วน และมีประสิทธิภาพ มากยิ่งขึ้น",
      author: "wuttha",
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      createAt: "05 December 2024 - 21:11",
    }
  ]);


  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="flex justify-center mb-8">
        <div
        className="px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.12)]backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60">
          <h1 className=" text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight font-serif">
      SE-NPRU-BLOG : บทความล่าสุด
      </h1>
    </div>
    </div>
  <div className="max-w-4xl mx-auto space-y-6 py-6">
    {articles.map((article, index) => (
      <Card key={article.id} index={index} item={article} />
    ))}
  </div>

</div>
  );
};

export default Home;
