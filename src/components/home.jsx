import { Link } from "react-router-dom";
import "../App.css";


function Home() {

  const categories = [
    { name: "Electronics", count: 156, color: "#3b82f6" },
    { name: "Furniture", count: 89, color: "#8b5cf6" },
    { name: "Stationery", count: 234, color: "#ec4899" },
    { name: "Accessories", count: 178, color: "#f59e0b" }
  ];

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Hero Section */}
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          color: "#166534",
          fontWeight: 700,
        }}>
          Welcome to Our Product Store
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "#15803d",
          maxWidth: 600,
          margin: "16px auto 32px",
        }}>
          Discover a variety of products tailored to your needs
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/products"
            className="primary-btn"
          >
            Browse Products
          </Link>
          <Link to="/about" className="secondary-btn">
            Learn More
        </Link>

        </div>
      </div>

      {/* Categories Section */}
      <div style={{ backgroundColor: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px", color: "#166534" }}>
            Popular Categories
          </h2>

          <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 48 }}>
            Explore our most popular product categories
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "32px 24px",
                  borderRadius: 12,
                  textAlign: "center",
                  textDecoration: "none",
                  border: "2px solid transparent",
                }}
              >
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: category.color,
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 24,
                  fontWeight: 700,
                }}>
                  {category.count}
                </div>

                <h3 style={{ color: "#166534", fontWeight: 600 }}>
                  {category.name}
                </h3>

                <p style={{ color: "#6b7280", fontSize: 14 }}>
                  {category.count} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;