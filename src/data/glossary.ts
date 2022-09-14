import {GlossaryProps} from "../component/interface/glossary-props";
import glossary from "./glossary.json"
import { GlossaryLinkProps } from "../component/interface/glossary-link-props";

export const Glossary : GlossaryProps[] = glossary.nodes;
export const GlossaryLinks : GlossaryLinkProps[] = glossary.links;


