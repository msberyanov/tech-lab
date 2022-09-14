import React, { useEffect } from 'react';
import './index.css';
import { Glossary } from "../data/glossary";
import { Card } from "../component/card";
import { Route, Routes } from "react-router-dom";
import { Header } from "../component/header";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Canvas } from "../component/canvas";

export const Portfolio: React.FC = () => {
  useEffect(() => {
    window.onscroll = () => {
      const navigationAreaHeader = document.getElementById("navigation-area-header");
      const footerButton = document.getElementById("footer-button");

      if (window.scrollY > 10) {
        if (!navigationAreaHeader?.classList.contains("navigation-area-hidden")) {
          navigationAreaHeader?.classList.add("navigation-area-hidden");
        }

        if (footerButton?.classList.contains("footer-button-hidden")) {
          footerButton?.classList.remove("footer-button-hidden")
        }
      } else {
        if (navigationAreaHeader?.classList.contains("navigation-area-hidden")) {
          navigationAreaHeader?.classList.remove("navigation-area-hidden");
        }

        if (!footerButton?.classList.contains("footer-button-hidden")) {
          footerButton?.classList.add("footer-button-hidden")
        }
      }
    };
  }, []);

  const scrollToTop = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;

    if (top > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, top - top / 8);
    }
  };

  return (
    <div className="portfolio-area">
      <Header/>

      <Routes>
        <Route
          path="/glossary"
          element={
            <div className="content-area">
              {Glossary.map(notion => <Card id={notion.id} term={notion.term} definition={notion.definition}/>)}
            </div>
          }
        />

        <Route
          path="/semantic-graph"
          element={
            <div className="content-area">
              <Canvas/>
            </div>
          }
        />
      </Routes>

      <footer
        className="footer-button footer-button-hidden"
        id="footer-button"
        onClick={scrollToTop}>
        <AiOutlineArrowUp className="footer-button-icon"/>
        Наверх
      </footer>
    </div>
  );
}
