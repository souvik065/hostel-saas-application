export type CrewSelectProps = {
  label?: string;
  items: DropdownItem[];
  borderColor?: string;
  selectedValue: DropdownItem | null;
  onItemSelect: (item: DropdownItem | null) => void;
  sx?: Record<string, any>;
  placeholder: string;
  errorMessage?: string;
  error?: boolean;
};
