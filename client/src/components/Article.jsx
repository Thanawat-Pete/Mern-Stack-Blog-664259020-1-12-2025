import React from "react";
import Card from "./Card";

const ArticlesList = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <span>No Content.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {items.map((it) => (
        <Card key={it.itemId || it.id} item={it} />
      ))}
    </div>
  );
};

export default ArticlesList;
