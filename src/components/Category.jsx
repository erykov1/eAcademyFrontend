import React from "react"; 

const Category = ({ categoryName, categoryId, onClick }) => {
  return (
    <div className="category-container">
      <button className="category-btn" onClick={() => onClick(categoryId)}>
        {categoryName}
      </button>
    </div>
  );
}

export default Category;