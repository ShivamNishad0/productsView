import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedin },
    { name: "GitHub", url: "https://github.com", icon: FaGithub }
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" }
  ];

  return (
    <footer>
      <div style={{ backgroundColor: "#d2efdbff", padding: "30px 10px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Nav + Social */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "48px",
            padding: "0 20px",
          }}>

            {/* Navigation */}
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = "#14532d"}
                  onMouseLeave={(e) => e.target.style.color = "#166534"}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "16px" }}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    style={{ color: "#166534", transition: "0.2s" }}
                  >
                    <Icon size={28} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "32px", color: "#166534", fontWeight: 700 }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: "#15803d", margin: "16px auto", maxWidth: 600 }}>
              Browse our full catalog and find the perfect products for you
            </p>

            <Link
              to="/products"
              style={{
                padding: "14px 36px",
                backgroundColor: "#166534",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              View All Products →
            </Link>

            <p style={{ color: "#166534", marginTop: 25, fontSize: 14 }}>
              © {new Date().getFullYear()} Product Inventory Manager. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#166534",
  textDecoration: "none",
  fontWeight: "500",
};

export default Footer;