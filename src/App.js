import './App.css';
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Results from "./components/Results";
import Home from "./components/Home";
import Product from "./components/Product";
import Products from "./components/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/results" element={<Results />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h2>Page Not Found</h2>
            <Link 
              to="/" 
              style={{ 
                textDecoration: 'none', 
                color: '#007bff',
                fontSize: '18px'
              }}
            >
              ← Return to Home
            </Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
