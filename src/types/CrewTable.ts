import { CrewIconProps } from './CrewIconProps';

export interface HeadLabel {
  id: string;
  label: string;
  alignRight?: boolean;
}

export interface CrewTableNameProps {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: HeadLabel[];
  numSelected: number;
  onSelectAllClick?: () => void;
  showCheckbox: boolean;
  showEditHeader?: boolean;
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
  lableFontWeight: 'bold' | 'normal';
  onRequestSort?: (value: string) => void;
}
export interface Column {
  id: string;
  label: string;
}

export interface CrewTableModalProps {
  open: boolean;
  onClose: () => void;
  onActionSelect?: (action: string) => void;
  anchorEl: HTMLElement | null;
  actions: { id: number; label: string }[];
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
}
export interface CrewTableProps {
  tableName: string;
  data: any[];
  columns: Column[];
  showEditButton?: boolean;
  handleEditClick?: () => void;
  Modal: CrewTableModalProps;
  TableName: CrewTableNameProps;
  onSetSelectedRow?: (row: any) => void;
  tableNameIcon?: CrewIconProps;
  tableNameIconPlacementPosition?: 'left' | 'right';
}
