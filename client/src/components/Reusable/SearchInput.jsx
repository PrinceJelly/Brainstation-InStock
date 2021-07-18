export default function InputField({
  name,
  addClass,
  placeholder,
  removeError,
  type,
  value,
  errorClass,
}) {
  return (
    <input
      name={name}
      className={`form__input ${addClass}`}
      placeholder={placeholder}
      defaultValue={value}
      type={type ? type : "text"}
      onChange={removeError && ((e) => removeError(e, errorClass))}
    />
  );
}
