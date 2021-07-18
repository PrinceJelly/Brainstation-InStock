export default function Modal({ addClass, setShowing, children }) {
  return (
    <section className={`modal__section ${addClass ? addClass : ""}`}>
      {children}
    </section>
  );
}
