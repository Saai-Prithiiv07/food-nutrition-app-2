export default function FoodCard({ product }) {
  return (
    <div>
      <h3>{product.product_name || "No Name"}</h3>
      <p>Brand: {product.brands || "Unknown"}</p>
      <img
        src={product.image_front_thumb_url || "https://via.placeholder.com/100"}
        alt="food"
      />
      <p>Calories: {product.nutriments?.energy_kcal || "N/A"}</p>
      <p>Protein: {product.nutriments?.proteins || "N/A"}</p>
      <p>Fat: {product.nutriments?.fat || "N/A"}</p>
    </div>
  );
}