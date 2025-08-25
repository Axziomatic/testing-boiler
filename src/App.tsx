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
    <div className="bg-slate-400 flex flex-col justify-center items-center h-screen w-screen p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Thoughts... 🤔</h1>

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

        <div className="mt-8 text-left">
          <h2 className="text-xl font-semibold mb-2">Thought feed</h2>
          {thoughts.length === 0 ? (
            <p className="text-gray-500 italic">No thoughts, head empty...</p>
          ) : (
            <ul className="space-y-2">
              {thoughts.map((thought) => (
                <li
                  key={thought.id}
                  className="flex justify-between items-center bg-slate-100 rounded-lg p-2"
                >
                  <span>{thought.text}</span>
                  <button
                    onClick={() => handleDeleteThought(thought.id)}
                    aria-label={`delete-thought-${thought.id}`}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
