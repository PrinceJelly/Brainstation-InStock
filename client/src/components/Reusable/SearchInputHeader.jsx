export default function InputField({
  addClass,
  placeholder,
  handleChange,
  pattern,
}) {
  return (
    <input
      className={`form__input ${addClass}`}
      placeholder={placeholder}
      onChange={handleChange && ((e) => handleChange(e))}
      pattern={pattern}
    />
  );
}
