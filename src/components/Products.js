import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
               // const url = "http://localhost:8080/products_contentfull";
                const url = 'https://api-concours-atchoum.onrender.com/products_contentfull'
                const response = await axios.get(url);

                console.log("RAW API RESPONSE:", response.data);

                // Vérifier où est le tableau
                const dataRes = response.data.res || response.data || [];

                const prods = Array.isArray(dataRes) ? dataRes : [];
                setProducts(prods);
                console.log("Products set, count:", prods.length);
                setIsLoaded(true);
            } catch (e) {
                console.error("Error on fetch Contentful Products:", e);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f8f9fa",
            }}
        >
            {/* Header */}
            <header
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{ margin: 0, color: "#007bff" }}>Test Store</h1>
                    <nav>
                        <Link
                            to="/"
                            style={{ marginRight: "20px", textDecoration: "none", color: "#333" }}
                        >
                            Home
                        </Link>
                        <Link to="/products" style={{ textDecoration: "none", color: "#333" }}>
                            Products
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            {isLoaded ? (
                <main
                    style={{
                        maxWidth: "1200px",
                        margin: "40px auto",
                        padding: "0 20px",
                        flex: 1,
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
                        Featured Products
                    </h2>

                    {products.length === 0 ? (
                        <p style={{ textAlign: "center" }}>Aucun produit trouvé.</p>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                gap: "30px",
                            }}
                        >
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #eee",
                                        borderRadius: "8px",
                                        padding: "15px",
                                        textAlign: "center",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        cursor: "pointer",
                                    }}
                                    // Hover style with inline is tricky, can add class or styled component for real project
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "none";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "4px",
                                            marginBottom: "15px",
                                        }}
                                    />
                                    <h3 style={{ margin: "10px 0", color: "#333" }}>{product.name}</h3>
                                    <p style={{ color: "#007bff", fontWeight: "bold" }}>
                                        Marque : {product.brand}
                                    </p>
                                    <p style={{ color: "#666", fontSize: "14px", margin: "10px 0" }}>
                                        Taille : {product.size} | Couleur : {product.color}
                                    </p>
                                    <Link
                                        to={`/product/${product.id}`}
                                        style={{
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            textDecoration: "none",
                                            display: "inline-block",
                                        }}
                                    >
                                        Voir le produit
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            ) : (
                <p style={{ textAlign: "center", marginTop: "50px" }}>Chargement en cours...</p>
            )}

            {/* Footer */}
            <footer
                style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "40px 20px",
                    marginTop: "auto",
                }}
            >
                <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
                    <p>© 2025 Test Store. All rights reserved.</p>
                    <p style={{ fontSize: "14px", color: "#999", marginTop: "10px" }}>
                        This is a testing environment for e-commerce functionality
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Products;
