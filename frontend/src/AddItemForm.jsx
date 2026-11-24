import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/items";

export default function AddItemForm({ onItemAdded }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Movie");
  const [status, setStatus] = useState("pending");
  const [rating, setRating] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setFormError("Title is required.");
      return;
    }

    const payload = {
      title: trimmedTitle,
      category,
      status,
    };

    if (rating !== "") {
      payload.rating = Number(rating);
    }

    setSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const createdItem = await response.json();

      if (onItemAdded) {
        onItemAdded(createdItem);
      }

      setTitle("");
      setRating("");
      setStatus("pending");
    } 
    
    catch (err) {
      setFormError(err.message);
    }
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "0.75rem",
        border: "1px solid #444",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <h2>Add new item</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Dune or Project Hail Mary"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        >
          <option value="Movie">Movie</option>
          <option value="Series">Series</option>
          <option value="Book">Book</option>


        </select>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        >
          <option value="pending">pending</option>
          <option value="completed">completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="rating">Rating (optional)</label>
          <div className="rating-wrapper">
            <input
              id="rating"
              type="number"
              className="rating-input"
              min="1"
              max="5"
              step="1"
              placeholder="Optional"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <span className="rating-suffix">/ 5</span>
          </div>
      </div>

      {formError && <p style={{ color: "#f87171", margin: 0 }}>{formError}</p>}

      <button type="submit" disabled={submitting} style={{ padding: "0.6rem 1rem" }}>
        {submitting ? "Adding..." : "Add item"}
      </button>
    </form>
  );
}