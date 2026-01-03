import { useEffect, useState } from "react";
import "../styles/products.css";

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
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("card");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});

  const itemsPerPage = 10;

  /* Debounce search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleChange = (e) => {
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Price validation (required, number)
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    // Category validation (required)
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }
    
    // Stock validation (optional, but must be number if provided)
    if (formData.stock && isNaN(formData.stock)) {
      newErrors.stock = "Stock must be a number";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});

    if (editId) {
      setProducts(
        products.map((p) => (p.id === editId ? { ...formData, id: editId } : p))
      );
      setEditId(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }

    setFormData({ name: "", price: "", category: "", stock: "", description: "" });
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", price: "", category: "", stock: "", description: "" });
    setShowForm(false);
  };

  /* Filter + Pagination */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="products-wrapper">
      {/* Header */}
      <div className="products-header">
        <h1>Product Inventory Manager</h1>
        <p>Manage your product catalog efficiently</p>
      

      {/* Top Search Bar */}
      <div className="products-topbar">
        <input
          className="search-input"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="top-actions">
          <button className="btn primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Product"}
          </button>

          <button className="btn secondary" onClick={() => setView(view === "card" ? "list" : "card")}>
            {view === "card" ? "List View" : "Card View"}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>{editId ? "Edit Product" : "Add New Product"}</h3>

          <div className="form-grid">
            <div className="form-field">
              <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-field">
              <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>
            <div className="form-field">
              <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
              {errors.category && <span className="error">{errors.category}</span>}
            </div>
            <div className="form-field">
              <input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} />
              {errors.stock && <span className="error">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-field">
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button className="btn primary" type="submit">
              {editId ? "Update" : "Add"}
            </button>
            <button className="btn secondary" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {currentProducts.length === 0 && (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Add products to see them here</p>
        </div>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="products-grid">
          {currentProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <h4>{p.name}</h4>
              <p className="price">₹{p.price}</p>
              <p className="muted">{p.category}</p>
              <p className="muted">Stock: {p.stock}</p>
              <p>{p.description}</p>

              <div className="card-actions">
                <button className="edit" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="products-list">
          <div className="list-header">
            <span>Product</span>
            <span>Price</span>
            <span>Category</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>
          {currentProducts.map((p) => (
            <div className="list-row" key={p.id}>
              <div className="list-name">
                <strong>{p.name}</strong>
                <p>{p.description}</p>
              </div>
              <span>₹{p.price}</span>
              <span>{p.category}</span>
              <span>{p.stock}</span>
              <div className="list-actions">
                <button className="edit" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Products;
