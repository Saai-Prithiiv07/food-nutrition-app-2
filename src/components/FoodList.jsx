import React from "react";

function FoodList({ products }) {
  return (
    <div className="food-list">
      {products.map((item) => (
        <div key={item._id} className="food-card">
          <img
            src={item.image_url || "https://via.placeholder.com/150"}
            alt={item.product_name}
            className="food-image"
          />
          <div className="food-info">
            <h3>{item.product_name}</h3>
            <p><strong>Brand:</strong> {item.brands || "Unknown"}</p>
            <p><strong>Nutrition Grade:</strong> 
              <span className={`grade grade-${item.nutrition_grades?.toLowerCase() || 'unknown'}`}>
                {item.nutrition_grades?.toUpperCase() || "N/A"}
              </span>
            </p>
            {item.nutriments && (
              <div className="nutrients">
                <span>⚡ {Math.round(item.nutriments["energy-kcal_100g"] || 0)} kcal</span>
                <span>💪 {Math.round(item.nutriments.proteins_100g || 0)}g Protein</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
