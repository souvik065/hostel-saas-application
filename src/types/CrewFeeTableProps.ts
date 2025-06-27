import { CrewTableNameProps } from "./CrewTable";

export interface Column {
    id: string;
    label: string;
  }

  export interface row {
    id: string;
    label: string;
  }

 
  export interface TableHeaderName {
    id:string,
    label:string, 
  }
export interface CrewFeeTableProps {
    columns: Column[];
    row: row[];
    showEditButton?: boolean;
    handleEditClick?: () => void;
    onSetSelectedRow?: (row: any) => void;
    tableHeaderName:TableHeaderName[]; 
  }