import { CrewIconProps } from "./CrewIconProps";

export type CrewTableNameprops = {
  tableName?: string;
  labelVariant?:
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
  fontWeight?: 'normal' | 'bold';
  iconPlacementPosition?: 'left' | 'right';
  icon?: CrewIconProps
};
