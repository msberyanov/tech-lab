import React from "react";
import "./index.css"

interface GlossaryRelationProps {
  id: string;
  relation: string;
}

export const GlossaryRelation: React.FC<GlossaryRelationProps> = ({
  id,
  relation
}) => {
  return (
    <div id={id} className="glossary-relation">
      {relation}
    </div>
  )
}
