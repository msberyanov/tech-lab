import React, { useCallback, useState } from "react";
import { GlossaryNodeState } from "../../interface/glossary-node-state";
import { GlossaryNodeCoordinate } from "../../interface/glossary-node-coordinate";
import "./index.css"
import { GlossaryLinks } from "../../../data/glossary";

interface GlossaryNodeProps {
  id: string;
  title: string;
  connectNodes: () => void;
  initialPosition: GlossaryNodeCoordinate;
}

export const GlossaryNode: React.FC<GlossaryNodeProps> = ({
  id,
  title,
  connectNodes,
  initialPosition
}) => {
  const [state, setState] = useState<GlossaryNodeState>({
    current: initialPosition,
    position: initialPosition,
    relativePosition: initialPosition,
    dragging: false,
  });

  let idNumber: string | RegExpMatchArray | null = id.match(/\d+/g);

  if (idNumber) {
    idNumber = idNumber[0];
  }

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    connectNodes();

    if (event.button !== 0) return;

    setState(prevState => {
      return ({
        ...prevState,
        position: {
          x: event.pageX,
          y: event.pageY
        },
        relativePosition: {
          x: event.pageX,
          y: event.pageY
        },
        dragging: true
      })
    });

    event.stopPropagation();
    event.preventDefault();
  }, [connectNodes]);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    connectNodes();
    if (state.dragging) {
      setState(prevState => ({
        ...prevState,
        relativePosition: {
          x: event.pageX,
          y: event.pageY
        },
      }));
    }

    event.stopPropagation();
    event.preventDefault();
  }, [connectNodes, state.dragging]);

  const onMouseUp = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState(prevState => (
      {
        ...prevState,
        dragging: false,
        position: {
          x: event.pageX,
          y: event.pageY
        },
        current: {
          x: prevState.current.x + (state.position.x - event.pageX),
          y: prevState.current.y + (state.position.y - event.pageY),
        }
      })
    );

    event.stopPropagation();
    event.preventDefault();
  }, [state.position.x, state.position.y]);

  const onMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    GlossaryLinks
      .filter(notionLink => notionLink.source === idNumber)
      .forEach(notionLink => {
        const notionRelation = document.getElementById(`relation-${notionLink.source}-${notionLink.target}`);

        if (notionRelation?.classList.contains("glossary-relation-source")) {
          notionRelation?.classList.remove("glossary-relation-source");
        }
      });

    if (state.dragging) {
      setState(prevState => (
        {
          ...prevState,
          dragging: false,
          position: {
            x: event.pageX,
            y: event.pageY
          },
          current: {
            x: prevState.current.x + (state.position.x - state.relativePosition.x),
            y: prevState.current.y + (state.position.y - state.relativePosition.y),
          }
        })
      );
    }

    event.stopPropagation();
    event.preventDefault();
  }, [idNumber, state.dragging, state.position.x, state.position.y, state.relativePosition.x, state.relativePosition.y]);


  const onMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    GlossaryLinks
      .filter(notionLink => notionLink.source === idNumber)
      .forEach(notionLink => {
        const notionRelation = document.getElementById(`relation-${notionLink.source}-${notionLink.target}`);

        if (!notionRelation?.classList.contains("glossary-relation-source")) {
          notionRelation?.classList.add("glossary-relation-source");
        }
      });
  }, [idNumber]);

  return (
    <div
      id={id}
      className="node"
      style={{
        transform: `translate(${-state.current.x - (state.position.x - state.relativePosition.x)}px, ${-state.current.y - (state.position.y - state.relativePosition.y)}px)`,
      }}
      draggable={true}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {title}
    </div>
  );
}
