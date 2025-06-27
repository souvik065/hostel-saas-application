import { CrewTypography } from '../../atoms';
import { CrewTableNameProps } from '@/types/CrewTable';
import { Checkbox, TableRow, TableCell, TableHead, useTheme, TableSortLabel } from '@mui/material';
import './CrewTableHead.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
const CrewTableHead = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick,
  showCheckbox,
  showEditHeader,
  labelVariant = 'subtitle1',
  lableFontWeight,
  onRequestSort,
}: CrewTableNameProps) => {
  const theme = useTheme();

  return (
    <TableHead className={`table-head-container ${getThemeModeClass(theme.palette.mode)}`}>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <CrewTypography fontWeight={lableFontWeight} variant={labelVariant}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onRequestSort?.(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </CrewTypography>
          </TableCell>
        ))}
        {showEditHeader && (
          <TableCell>
            <CrewTypography fontWeight={lableFontWeight} variant={labelVariant}>
              Edit
            </CrewTypography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default CrewTableHead;
