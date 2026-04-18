import { motion } from "framer-motion";
import useFoodSearch from "../hooks/useFoodSearch";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage({ dispatch }) {
  const { data, loading, error, searchFood } = useFoodSearch();

  return (
    <div style={{ padding: '0 40px 40px' }}>
      <header style={{ textAlign: 'center', margin: '60px 0' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>
          Discover What You <span style={{ color: 'var(--primary)' }}>Eat</span>
        </h2>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Search thousands of products for instant nutritional insights.</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
        <SearchBar onSearch={searchFood} />
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <div className="animate-spin" style={{ 
            width: '50px', height: '50px', border: '5px solid var(--glass)', 
            borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto' 
          }}></div>
          <p style={{ marginTop: '20px', color: 'var(--primary)', fontWeight: '600' }}>Fetching nutrition data...</p>
        </div>
      )}
      
      {error && <ErrorMessage message={error} />}

      <motion.div 
        layout
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}
      >
        {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.code}
          >
            <ProductCard product={item} dispatch={dispatch} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}