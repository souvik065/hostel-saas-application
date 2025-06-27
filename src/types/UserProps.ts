interface UserProps {
  email?: string | null;
  image?: string | null;
  name?: string | null;
  displayEmail?: boolean;
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
  onClick: () => void;
  loading: boolean;
}
