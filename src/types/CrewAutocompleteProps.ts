export interface CrewAutocompleteProps {
  options: Array<{ [key: string]: string | number }>;
  labelKey: string;
  idKey?: string;
  label?: string;
  onSelect: (selectedValue: { [key: string]: string | number } | null) => void;
  radius?: number;
}
