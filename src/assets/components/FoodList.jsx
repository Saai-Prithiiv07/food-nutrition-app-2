import FoodCard from "./FoodCard";

export default function FoodList({ products }) {
  return (
    <div>
      {products.map((item, index) => (
        <FoodCard key={item.id || index} product={item} />
      ))}
    </div>
  );
}