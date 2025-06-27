import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CrewIconProps } from "./CrewIconProps";

export interface CrewPageHeadProps {
  text: string;
  variant:
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
    icon?: CrewIconProps;
    iconPlacementPosition?: 'left' | 'right';
}
