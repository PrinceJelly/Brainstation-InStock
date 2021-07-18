export default function DropDownList ({name, options , values, addClass, disabled, selectedOption}) {

    //values does not have to be set, ONLY if different from the options provided.
    //Values must be provided in same order as options
    return(
        <select 
        name={name} 
        className={`form__forminput form__drop-down ${addClass ? addClass : ""}`} 
        disabled={disabled ? true : false}
        defaultValue={selectedOption ? selectedOption : ""}
        >
            {options.map((option,i) => <option 
            key={option} 
            value={values && values.length > 0 ? values[i] : option} 
            >{option}
            </option>)}
        </select>
    );
};