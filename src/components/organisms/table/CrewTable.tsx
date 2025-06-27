import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CrewTableProps } from '../../../types/CrewTable';
import { CrewIcon, CrewTableInfo, CrewTableName, CrewTypography } from '../../atoms';
import {
  CrewEntriesPerPageSelector,
  CrewPagination,
  CrewTableHead,
  CrewTableModal,
  CrewTableSearch,
} from '../../molecules';
import './CrewTable.scss';
import { convertDateTimeToTimeString, formatDateFromBackend } from '../../../utils/DateHelper';

const CrewTable = ({
  tableName,
  Modal,
  TableName,
  showEditButton,
  data,
  columns,
  onSetSelectedRow,
  ...props
}: CrewTableProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [searchedData, setSearchedData] = useState(data);

  const [orderBy, setOrderBy] = useState<string>(TableName.orderBy || '');
  const [order, setOrder] = useState<string>(TableName.order || 'asc');

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleItemsPerPageChange = (newValue: number) => {
    setPageSize(newValue);
  };

  const handleSearch = (searchQuery: string) => {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
    );
    setSearchedData(filteredData);
  };

  const sortedData = useMemo(() => {
    if (!orderBy) {
      return searchedData;
    }
    const Data = [...searchedData].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
    return Data;
  }, [searchedData, orderBy, order]);

  const currentTableData = useMemo(() => {
    if (!Array.isArray(sortedData)) {
      return []; // or any default value you prefer
    }

    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, sortedData]);

  const handleEditClick = (event: any, row: any) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
    setModalOpen(true);
    onSetSelectedRow?.(row);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
    setAnchorEl(null);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    setSearchedData(data);
  }, [data]);

  return (
    <Stack spacing={2} className="table-container">
      <CrewTableName
        tableName={tableName}
        labelVariant="h4"
        icon={props.tableNameIcon}
        iconPlacementPosition={props.tableNameIconPlacementPosition}
      />
      <Stack className="table-page-search" spacing={{ xs: 2, sm: 1 }} direction={{ lg: 'row' }}>
        <CrewEntriesPerPageSelector pageSize={pageSize} onChange={handleItemsPerPageChange} />
        <CrewTableSearch onSearch={(value) => handleSearch(value)} />
      </Stack>
      <TableContainer>
        <Table>
          <CrewTableHead
            lableFontWeight="bold"
            labelVariant={TableName.labelVariant}
            order={TableName.order}
            orderBy={TableName.orderBy}
            headLabel={columns}
            rowCount={TableName.rowCount}
            numSelected={TableName.numSelected}
            onSelectAllClick={TableName.onSelectAllClick}
            showCheckbox={TableName.showCheckbox}
            showEditHeader={showEditButton}
            onRequestSort={handleRequestSort}
          />
          <TableBody className="table-body-container">
            {currentTableData?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <CrewTypography variant="subtitle2">
                      {/* {row[column.id] !== null ? row[column.id] : '-'} */}
                      {(() => {
                        switch (column.id) {
                          case 'createdAt':
                            return formatDateFromBackend(row[column.id]);
                          case 'fromDate':
                            return formatDateFromBackend(row[column.id]);
                          case 'toDate':
                            return formatDateFromBackend(row[column.id]);
                          case 'timeFrom':
                            return row[column.id] !== null ? convertDateTimeToTimeString(row[column.id]) : '-';
                          case 'timeTo':
                            return row[column.id] !== null ? convertDateTimeToTimeString(row[column.id]) : '-';
                          default:
                            return row[column.id] !== null ? row[column.id] : '-';
                        }
                      })()}
                    </CrewTypography>
                  </TableCell>
                ))}
                {showEditButton && (
                  <TableCell>
                    <Stack className="table-edit-icon" component="span" onClick={(e) => handleEditClick(e, row)}>
                      <CrewIcon icon={faEllipsis} />
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className="table-pagination-row">
        <Grid className="table-pagination-row-entries" item xs={12} sm={12} md={6} lg={6} xl={6} px={1}>
          <CrewTableInfo currentPage={currentPage} itemsPerPage={pageSize} totalItems={data?.length ?? 0} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} px={1}>
          <CrewPagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data?.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Grid>
      </Grid>
      <CrewTableModal
        actions={Modal?.actions}
        open={isModalOpen}
        onClose={handleCloseModal}
        anchorEl={anchorEl}
        onActionSelect={Modal?.onActionSelect}
      />
    </Stack>
  );
};

export default CrewTable;
