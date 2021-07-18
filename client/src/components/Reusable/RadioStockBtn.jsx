export default function RadioStockBtn({value, addClass, labelName, id, handleClick, checked}){
    return(
        <span className={`form__radio-label ${addClass ? addClass : ""}`}>
            <input id={id} className="form__radio-btn" type="radio" name="stock" value={value} onChange={e => handleClick(e)} checked={checked} />
            <label htmlFor={id} >{labelName}</label>
        </span>
    );
};