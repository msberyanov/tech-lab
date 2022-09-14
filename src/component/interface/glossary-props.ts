import { GlossaryNodeCoordinate } from "./glossary-node-coordinate";

export interface GlossaryProps {
  id: string;
  term: string;
  definition: string;
  coordinate: GlossaryNodeCoordinate;
}
