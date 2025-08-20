import { useState } from "react";
import AddThoughtButton from "./components/AddThoughtButton";
import CounterButton from "./components/CounterButton";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Vite + React</h1>

      <CounterButton />
      <AddThoughtButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div
          style={{
            border: "1px solid black",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <h2>Write a thought!</h2>
          <textarea placeholder="Write here" rows={4} cols={30}></textarea>
          <br />
          <button onClick={() => setIsOpen(false)}>Stäng</button>
        </div>
      )}
    </div>
  );
}

export default App;
