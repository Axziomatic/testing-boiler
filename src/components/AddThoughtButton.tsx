type AddThoughtButtonProps = {
  onClick: () => void;
};

function AddThoughtButton({ onClick }: AddThoughtButtonProps) {
  return <button onClick={onClick}>Add Thought!</button>;
}

export default AddThoughtButton;
