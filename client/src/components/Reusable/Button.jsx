export default function Btn({ addClass, children, handleClick }) {
  return (
    <button
      className={`btn ${addClass}`}
      onClick={handleClick && (() => handleClick())}
    >
      {children}
    </button>
  );
}
