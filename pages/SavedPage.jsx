import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBasket } from "lucide-react";

export default function SavedPage({ state, dispatch }) {
  return (
    <div style={{ padding: '40px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Your <span style={{ color: 'var(--primary)' }}>Favorites</span></h2>
        <p style={{ color: '#aaa' }}>Manage your saved products and nutritional summaries.</p>
      </header>

      {state.saved.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '100px 20px', 
          background: 'var(--glass)', 
          borderRadius: '20px',
          border: '1px dashed var(--glass-border)'
        }}>
          <ShoppingBasket size={60} color="#555" style={{ marginBottom: '20px' }} />
          <h3>No items saved yet</h3>
          <p style={{ color: '#888', marginTop: '10px' }}>Explore products and click the '+' button to save them here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          <AnimatePresence>
            {state.saved.map((item) => (
              <motion.div 
                key={item.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '20px',
                  gap: '20px'
                }}
              >
                <img 
                  src={item.image_url} 
                  alt={item.product_name} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '1.2rem' }}>{item.product_name}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: '600' }}>{item.brands}</p>
                </div>
                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: item.code })}
                  style={{
                    background: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid rgba(255, 107, 107, 0.2)',
                    color: '#ff6b6b',
                    padding: '12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
                    e.currentTarget.style.color = '#ff6b6b';
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}