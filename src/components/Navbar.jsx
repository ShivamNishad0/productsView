import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#d2efdbff", padding: "12px 24px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Product Inventory Manager Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </a>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "20px" }}>
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
};

export default Navbar;
