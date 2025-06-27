import Link from 'next/link';
import './CrewLink.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { useTheme } from '@mui/material';
import { CrewTypographyWithIcon } from '..';
import { CrewIconProps } from '../../../types/CrewIconProps';
interface Props {
  href: string;
  target?: string;
  variant?:
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
    | 'caption'
    | 'overline';
  children?: JSX.Element | string;
  iconPlacementPosition?: 'left' | 'right';
  prefixSuffixIcon?: CrewIconProps;
  className?: string;
}

const CrewLink = ({ href, children, target, variant, ...props }: Props) => {
  const theme = useTheme();

  return (
    <Link
      className={`link-content ${props.className} ${getThemeModeClass(theme.palette.mode)}`}
      href={href}
      target={target}
    >
      <CrewTypographyWithIcon
        variant={variant}
        icon={props?.prefixSuffixIcon}
        iconPlacementPosition={props?.iconPlacementPosition}
      >
        {children}
      </CrewTypographyWithIcon>
    </Link>
  );
};

export default CrewLink;
