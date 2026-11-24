import{useEffect, useState} from "react";
import { getStatusLabel } from "./statusHelpers";
import ItemsList from "./ItemsList";
import AddItemForm from "./AddItemForm";
import "./App.css";

const API_URL= "http://127.0.0.1:8000/items";

export default function App(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect ( () => {
    async function loadItems(){
      try{
        const response = await fetch(API_URL); 
        if (!response.ok) {
          throw new Error (`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.items || []);
      }
      catch (err){
        setError(err.message);
      }
      setLoading(false);

  
    }
    
    loadItems();

  }, []);

  function handleItemAdded(createdItem){
    setItems ((prevItems) => [...prevItems, createdItem]);
  }

  if (loading) {
    return <p>Loading list...</p>;
  }

  if (error) {
    return <p>Error loading list: {error}</p>;
  }

  return (
    <main style={{ maxWidth: "720px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Bingemaxxing</h1>
      <AddItemForm onItemAdded={handleItemAdded} />
      <ItemsList items={items} />
    </main>
  );
}


