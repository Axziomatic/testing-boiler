import { useState } from "react";
import AddThoughtButton from "./components/AddThoughtButton";
import AddThoughtModal from "./components/AddThoughtModal";

type Thought = { id: number; text: string };

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  const handleAddThought = (text: string) => {
    setThoughts([{ id: Date.now(), text }, ...thoughts]);
  };

  const handleDeleteThought = (id: number) => {
    setThoughts(thoughts.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1>Vite + React</h1>

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
            {thoughts.map((thought, index) => (
              <li key={index}>
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
