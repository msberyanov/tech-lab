import React from "react";
import {Link, useLocation} from "react-router-dom";
import { TbVocabulary } from "react-icons/tb";
import { MdGraphicEq } from "react-icons/md";

export const Navigation: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <div className="navigation-button-area">
      <Link to="/glossary" className="navigation-link">
        <div className={`navigation-button ${pathname === "/glossary" ? "navigation-button-selected" : ""}`}>
          <TbVocabulary className="navigation-button-icon"/>
          Глоссарий
        </div>
      </Link>

      <Link to="/semantic-graph" className="navigation-link">
        <div className={`navigation-button ${pathname === "/semantic-graph" ? "navigation-button-selected" : ""}`}>
          <MdGraphicEq className="navigation-button-icon"/>
          Семантический граф
        </div>
      </Link>
    </div>
  )
}
