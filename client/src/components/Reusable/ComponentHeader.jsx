import Icon from "../Reusable/react-svg-library";
import { Link } from "react-router-dom";
export default function ComponentHeader({
  text,
  addClass,
  children,
  backArrow,
  prevPage,
}) {
  return (
    <div className={`component-head ${addClass ? addClass : ""}`}>
      {backArrow ? (
        <Link to={prevPage} className="component-head__back-link">
          <Icon name="arrow_back-24px.svg" addClass="component-head__back-arrow" />
        </Link>
      ) : (
        ""
      )}
      <h1 className={`component-head__header`}>{text}</h1>
      {children}
    </div>
  );
}

  // Add the below within the {children} prop slot in your component if you need an edit button - styles are already applied
  // <Link to={routerProps.match.url+'/edit'} className="btn__edit component-head__edit-btn"><Icon name="edit-24px-white.svg" addClass="component-head__edit-icon"/>
  // <span className="component-head__edit-text">Edit</span></Link> 

