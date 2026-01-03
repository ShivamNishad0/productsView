import { useState } from "react";
import "../styles/contactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    // synchronous logic
    console.log("Form submitted:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    { icon: "📧", title: "Email", details: "support@grayscientificlabs.com", link: "mailto:support@grayscientificlabs.com" },
    { icon: "📞", title: "Phone", details: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { icon: "📍", title: "Address", details: "123 Business St, Suite 100", link: null },
    { icon: "🕐", title: "Business Hours", details: "Mon–Fri: 9AM – 6PM", link: null },
  ];

  return (
    <div className="contact-wrapper">
      {/* Header */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out!</p>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Info Section */}
          <div>
            <h2>Get In Touch</h2>
            <p className="info-text">
              We'd love to hear from you. Our team is always here to help.
            </p>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div className="contact-card" key={index}>
                  <div className="contact-icon">{info.icon}</div>
                  <div>
                    <h4>{info.title}</h4>
                    {info.link ? <a href={info.link}>{info.details}</a> : <p>{info.details}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div>
            {submitted ? (
              <div className="success-box">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We’ll get back to you soon.</p>
              </div>
            ) : (
              <form className="form-card" onSubmit={handleSubmit}>
                <h2>Send Us a Message</h2>

                <div className="input-group">
                  <label>Full Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label>Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} />
                </div>

                <div className="input-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn-primary full-width" type="submit">
                  Send Message
                </button>

                <p className="privacy-text">
                  By submitting, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
