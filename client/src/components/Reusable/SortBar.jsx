import Icon from '../Reusable/react-svg-library';

export default function SortBar ({type, addClass}) {

    return(
        <header className="sortbar">
            {type=== 'wh-list' ? <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>WAREHOUSE<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p> : ""}
            {type=== 'wh-list' ? <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>ADDRESS<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p> : ""}
            {type=== 'wh-list' ? <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>CONTACT NAME<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p> : ""}
            {type=== 'wh-list' ? <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>CONTACT INFORMATION<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p> : ""}
            {type=== 'wh-list' ? "" : <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>INVENTORY ITEM<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p>}
            {type=== 'wh-list' ? "" : <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>CATEGORY<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p>}
            {type=== 'wh-list' ? "" : <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>STATUS<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p>}
            {type=== 'wh-list' ? "" : <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>QUANTITY<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p>}
            {type=== 'inv-list'? <p className={`sortbar__sub-header ${addClass ? addClass: ""}`}>WAREHOUSE<Icon name="sort-24px.svg" addClass="sortbar__sort-icon"/></p> : ""}
            <p className="sortbar__sub-header sortbar__act-header">ACTIONS</p>
        </header>
    );
};