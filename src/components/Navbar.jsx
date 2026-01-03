import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#d2efdbff", padding: "18px 5%" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Product Logo"
            style={{ 
              height: "40px", 
              maxWidth: "200px",
              width: "auto", 
              objectFit: "contain" 
            }}
          />
        </a>

        {/* Nav Links */}
        <div style={{ 
          display: "flex", 
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/products" style={linkStyle}>Products</a>
          <a href="/about" style={linkStyle}>About</a>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#166534",
  textDecoration: "none",
  fontWeight: "500",
  whiteSpace: "nowrap",
};

export default Navbar;