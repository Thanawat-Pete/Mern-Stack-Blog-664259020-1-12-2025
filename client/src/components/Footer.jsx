import React from "react";

const Footer = () => {
  return (
    <footer className="text-center bg-black text-gray-400 py-6">
      © {new Date().getFullYear()} Software Engineering, NPRU. All rights reserved.
    </footer>
  );
};

export default Footer;
