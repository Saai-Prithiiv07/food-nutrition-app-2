import { NavLink } from "react-router-dom";
import { Home, Bookmark, Utensils } from "lucide-react";

export default function NavBar({ savedCount }) {
  return (
    <nav className="glass-card" style={{
      margin: '20px',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Utensils size={28} color="var(--primary)" />
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
          Food<span style={{ color: 'var(--primary)' }}>Facts</span>
        </h1>
      </div>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive ? 'var(--primary)' : 'white',
            fontWeight: '600',
            transition: '0.3s'
          })}
        >
          <Home size={20} /> Home
        </NavLink>
        <NavLink 
          to="/saved" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive ? 'var(--primary)' : 'white',
            fontWeight: '600',
            transition: '0.3s'
          })}
        >
          <Bookmark size={20} /> Saved 
          <span style={{
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 8px',
            fontSize: '0.8rem'
          }}>{savedCount}</span>
        </NavLink>
      </div>
    </nav>
  );
}