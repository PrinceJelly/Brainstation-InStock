export default function Form({ addClass, children, handleSubmit, id }) {
  return (
    <form
      id={id ? id : ""}
      className={`form ${addClass ? addClass : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      {children}
    </form>
  );
}
