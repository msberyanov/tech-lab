import { GlossaryNodeCoordinate } from "./glossary-node-coordinate";

export interface GlossaryNodeState {
  current: GlossaryNodeCoordinate;
  position: GlossaryNodeCoordinate;
  relativePosition: GlossaryNodeCoordinate;
  dragging: boolean;
}
