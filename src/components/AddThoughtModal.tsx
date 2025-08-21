import { useState } from "react";

type AddThoughtModalProps = {
  onSubmit: (thought: string) => void;
  onClose: () => void;
};

function AddThoughtModal({ onSubmit, onClose }: AddThoughtModalProps) {
  const [newThought, setNewThought] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newThought.trim() === "") return;
    onSubmit(newThought);
    setNewThought("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="thought-form"
      style={{ border: "1px solid black", padding: "1rem", marginTop: "1rem" }}
    >
      <h2>Write a Thought!</h2>
      <textarea
        value={newThought}
        onChange={(e) => setNewThought(e.target.value)}
        placeholder="Write here"
        rows={4}
        cols={30}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default AddThoughtModal;
