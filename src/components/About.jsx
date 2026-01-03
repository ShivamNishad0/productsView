import React from "react";
import "../styles/about.css";

const team = [
  { name: "Sarah Johnson", role: "Founder & CEO", emoji: "👩‍💼" },
  { name: "Michael Chen", role: "Head of Operations", emoji: "👨‍💻" },
  { name: "Emily Rodriguez", role: "Customer Success", emoji: "👩‍🎓" },
  { name: "David Kim", role: "Product Manager", emoji: "👨‍🔧" },
];

function TeamCard({ emoji, name, role }) {
  return (
    <div className="team-card">
      <div className="team-emoji">{emoji}</div>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ minHeight: "100vh"}}>
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Welcome to our product store! We are dedicated to providing the best products for our customers.</p>
      </div>

      {/* Team Section */}
      <div style={{ backgroundColor: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 36px)", color: "#166534", fontWeight: "700", marginBottom: "16px" }}>
            Meet Our Team
          </h2>
          <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "48px" }}>The people behind our success</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
            {team.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{  padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", color: "#166534", fontWeight: "700", marginBottom: "16px" }}>
          Join Our Community
        </h2>
        <p style={{ color: "#15803d", fontSize: "18px", lineHeight: "1.6", marginBottom: "32px" }}>
          Experience the difference of shopping with a company that truly cares about quality and customer satisfaction.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/products" className="button-primary">Shop Now</a>
          <a href="/contact" className="button-secondary">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default About;
