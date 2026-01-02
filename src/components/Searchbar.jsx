function Searchbar() {
  return (
    <div style={{ 
      display: "flex", 
      gap: "8px",
      width: "100%",
      maxWidth: "500px",
      margin: "0 auto",
    }}>
      <input 
        type="text" 
        placeholder="Search products..." 
        style={{
          flex: "1",
          padding: "10px 16px",
          border: "2px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => e.target.style.borderColor = "#166534"}
        onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
      />
      <button style={{
        padding: "10px 24px",
        backgroundColor: "#166534",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: "500",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = "#14532d"}
      onMouseLeave={(e) => e.target.style.backgroundColor = "#166534"}
      >
        Search
      </button>
    </div>
  );
}

export default Searchbar;