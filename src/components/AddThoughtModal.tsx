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
      <h2>Write a thought</h2>
      <textarea
        value={newThought}
        onChange={(e) => setNewThought(e.target.value)}
        placeholder="Write here"
        rows={4}
        cols={30}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default AddThoughtModal;
