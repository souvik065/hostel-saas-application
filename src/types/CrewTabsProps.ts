import { ReactNode } from 'react';

export interface TabItem {
  label: string;
}

export interface CrewTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: TabItem[];
}

export interface CrewTabsWithChildrenProps {
  tabs: TabItem[];
  onChange: (newValue: number) => void;
  children: React.ReactNode;
}
