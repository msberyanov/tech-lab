import React, { useEffect } from "react";
import "./index.css"
import { Glossary, GlossaryLinks } from "../../data/glossary";
import { GlossaryNode } from "./glossary-node";
import { GlossaryRelation } from "./glossary-relation";

const getNodeCharacteristics = (id: string) => {
  const sourceNode = document.getElementById(`node-${id}`);

  const translate = sourceNode?.style.getPropertyValue("transform").match(/\d+/g);

  const width = sourceNode?.offsetWidth ?? 0;
  const height = sourceNode?.offsetHeight ?? 0;

  const translateX = Number(translate ? translate[0] : 0);
  const translateY = Number(translate ? translate[1] : 0);

  const left = Number(sourceNode?.clientLeft);
  const top = Number(sourceNode?.clientTop);

  return {
    width,
    height,
    translateX,
    translateY,
    left,
    top
  }
}

const connectNodes = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas?.getContext('2d');

  context?.clearRect(0, 0, canvas.width, canvas.height);

  GlossaryLinks.forEach(notionLink => {
    const {
      width: sourceWidth,
      height: sourceHeight,
      translateX: sourceTranslateX,
      translateY: sourceTranslateY,
      left: sourceLeft,
      top: sourceTop
    } = getNodeCharacteristics(notionLink.source);

    const {
      width: targetWidth,
      height: targetHeight,
      translateX: targetTranslateX,
      translateY: targetTranslateY,
      left: targetLeft,
      top: targetTop
    } = getNodeCharacteristics(notionLink.target);

    context?.beginPath()

    context?.moveTo(sourceWidth / 2 + sourceTranslateX + sourceLeft, sourceHeight / 2 + sourceTranslateY + sourceTop);

    context?.lineTo(targetWidth / 2 + targetTranslateX + targetLeft, targetHeight / 2 + targetTranslateY + targetTop)

    if (context?.lineWidth) {
      context.lineWidth = 2;
    }

    context?.stroke();

    const notionRelationTranslateX = (sourceWidth / 2 + sourceTranslateX + sourceLeft + targetWidth / 2 + targetTranslateX + targetLeft) / 2;
    const notionRelationTranslateY = (sourceHeight / 2 + sourceTranslateY + sourceTop + targetHeight / 2 + targetTranslateY + targetTop) / 2;

    console.log(sourceWidth / 2 + sourceTranslateX + sourceLeft, targetWidth / 2 + targetTranslateX + targetLeft)
    const notionRelation = document.getElementById(`relation-${notionLink.source}-${notionLink.target}`);

    const notionRelationWidth = notionRelation?.offsetWidth ?? 0;
    const notionRelationHeight = notionRelation?.offsetHeight ?? 0;

    notionRelation?.style.setProperty("transform", `translate(${notionRelationTranslateX - notionRelationWidth / 2}px, ${notionRelationTranslateY - notionRelationHeight / 2}px)`);
  });
}

export const Canvas: React.FC = () => {
  useEffect(() => {
    connectNodes();
  }, []);

  return (
    <>
      <canvas
        className="canvas"
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight - 30}
      />

      {Glossary.map(term =>
        <GlossaryNode
          id={`node-${term.id}`}
          title={term.term}
          connectNodes={connectNodes}
          initialPosition={{
            x: -term.coordinate.x,
            y: -term.coordinate.y
          }}
        />
      )}

      {GlossaryLinks.map(notionLink =>
        <GlossaryRelation
          id={`relation-${notionLink.source}-${notionLink.target}`}
          relation={notionLink.relation}
        />
      )}
    </>
  );
}
