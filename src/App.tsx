import { useEffect, useState } from "react";
import AddThoughtButton from "./components/AddThoughtButton";
import AddThoughtModal from "./components/AddThoughtModal";

type Thought = { id: number; text: string };

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("thoughts");
    if (stored) {
      setThoughts(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (updatedThoughts: Thought[]) => {
    localStorage.setItem("thoughts", JSON.stringify(updatedThoughts));
  };

  const handleAddThought = (text: string) => {
    const newThoughts = [{ id: Date.now(), text }, ...thoughts];
    setThoughts(newThoughts);
    saveToLocalStorage(newThoughts);
  };

  const handleDeleteThought = (id: number) => {
    const updatedThoughts = thoughts.filter((t) => t.id !== id);
    setThoughts(updatedThoughts);
    saveToLocalStorage(updatedThoughts);
  };

  return (
    <div>
      <AddThoughtButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <AddThoughtModal
          onSubmit={(thought) => {
            handleAddThought(thought);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div style={{ marginTop: "2rem" }}>
        <h2>Thought feed</h2>
        {thoughts.length === 0 ? (
          <p>No thoughts, head empty...</p>
        ) : (
          <ul>
            {thoughts.map((thought) => (
              <li key={thought.id}>
                {thought.text}
                <button
                  onClick={() => handleDeleteThought(thought.id)}
                  aria-label={`delete-thought-${thought.id}`}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
