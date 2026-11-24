import { getStatusLabel } from "./statusHelpers";

export default function ItemList({ items }) {
  if (items.length === 0) {
    return <p>No items in your list yet.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
      {items.map((item, index) => (
        <li
          key={item.id ?? index}
          style={{
            border: "1px solid #444",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <strong>{item.title}</strong>
          <div>Category: {item.category}</div>
          <div>Status: {getStatusLabel(item.category, item.status)}</div>
          {item.rating !== undefined && item.rating !== null && (
            <div>Rating: {item.rating}/5</div>
          )}
        </li>
      ))}
    </ul>
  );
}