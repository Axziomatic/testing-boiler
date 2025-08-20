import { useState } from "react";

type AddThoughtModalProps = {
  onSubmit: (thought: string) => void;
  onClose: () => void;
};

function AddThoughtModal({ onSubmit, onClose }: AddThoughtModalProps) {
  const [newThought, setNewThought] = useState("");

  const handleSubmit = () => {
    if (newThought.trim() === "") return;
    onSubmit(newThought);
    setNewThought("");
    onClose();
  };

  return (
    <div
      style={{ border: "1px solid black", padding: "1rem", marginTop: "1rem" }}
    >
      <h2>Skriv en tanke</h2>
      <textarea
        value={newThought}
        onChange={(e) => setNewThought(e.target.value)}
        placeholder="Skriv här..."
        rows={4}
        cols={30}
      />
      <br />
      <button onClick={handleSubmit}>Slutför</button>
      <button onClick={onClose}>Avbryt</button>
    </div>
  );
}

export default AddThoughtModal;
