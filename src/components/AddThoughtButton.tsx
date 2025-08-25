type AddThoughtButtonProps = {
  onClick: () => void;
};

function AddThoughtButton({ onClick }: AddThoughtButtonProps) {
  return (
    <button
      className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg 
                 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl 
                 active:scale-95 transition transform duration-150
                 focus:outline-none focus:ring-4 focus:ring-blue-300"
      onClick={onClick}
    >
      Add Thought!
    </button>
  );
}

export default AddThoughtButton;
