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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        aria-label="thought-form"
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Write a Thought!
        </h2>

        <textarea
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddThoughtModal;
