import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);
  const [view, setView] = useState("card");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  /* ------------------ Debounce Search ------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* ------------------ Handlers ------------------ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Name, Price, Category are required");
      return;
    }

    if (editId) {
      setProducts(
        products.map((p) =>
          p.id === editId ? { ...formData, id: editId } : p
        )
      );
      setEditId(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }

    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  /* ------------------ Filtering & Pagination ------------------ */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + itemsPerPage
  );

  return (
    <div style={styles.container}>
      <h2>Product Inventory Manager</h2>

      {/* Search & Toggle */}
      <div style={styles.topBar}>
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setView(view === "card" ? "list" : "card")}>
          Switch to {view === "card" ? "List" : "Card"} View
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Name *" value={formData.name} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price *" value={formData.price} onChange={handleChange} />
        <input name="category" placeholder="Category *" value={formData.category} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

        <button type="submit">{editId ? "Update" : "Add"} Product</button>
      </form>

      {/* Card View */}
      {view === "card" && (
        <div style={styles.grid}>
          {paginatedProducts.map((p) => (
            <div key={p.id} style={styles.card}>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <p>{p.category}</p>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------ Styles ------------------ */
const styles = {
  container: { maxWidth: "900px", margin: "auto", padding: "20px" },
  topBar: { display: "flex", gap: "10px", marginBottom: "15px" },
  form: { display: "grid", gap: "10px", marginBottom: "20px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "15px" },
  card: { border: "1px solid #ddd", padding: "15px", borderRadius: "8px" },
  table: { width: "100%", borderCollapse: "collapse" },
  pagination: { marginTop: "15px", display: "flex", gap: "8px" },
};

export default Products;
