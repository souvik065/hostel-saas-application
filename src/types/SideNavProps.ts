interface SideNavProps {
  open: boolean;
  user: User;
  onClose?: () => void;
  userRole?: string | null;
}

type User = {
  name: string;
  email: string;
  image: string;
};
