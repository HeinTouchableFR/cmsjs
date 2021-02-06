import React from "react";

export default function Component({ balise, label, hover, color }) {
  return (
    <>
      <div
        className="ui labeled circular button menu-button"
        tabindex="0"
        data-tooltip={hover}
        data-position="right center"
        data-variation="inverted"
      >
        <div className={`ui button ${color}`}>{balise}</div>
        <a className={`ui basic left pointing label ${color}`}>{label}</a>
      </div>
      <br />
    </>
  );
}
