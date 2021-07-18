import React from "react";
import { ReactSVG } from "react-svg";

const Icon = (props) => {
  return <ReactSVG className={props.addClass ? props.addClass : "IconSVG"} src={`/icons/${props.name}`} wrapper="span"/>;
};

export default Icon;