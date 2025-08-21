import { useState } from "react";
import AddThoughtButton from "./components/AddThoughtButton";
import AddThoughtModal from "./components/AddThoughtModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [thoughts, setThoughts] = useState<string[]>([]);

  const handleDeleteThought = (indexToRemove: number) => {
    setThoughts(thoughts.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h1>Vite + React</h1>

      <AddThoughtButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <AddThoughtModal
          onSubmit={(thought) => setThoughts([...thoughts, thought])}
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
                {thought}
                <button
                  onClick={() => handleDeleteThought(index)}
                  aria-label={`delete-thought-${index}`}
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
