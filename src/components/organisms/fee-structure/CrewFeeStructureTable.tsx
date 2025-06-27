import { CrewButton, CrewIcon, CrewTableInfo, CrewTableName, CrewTypography } from '../../../components/atoms';
import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './CrewFeeStructureTable.scss';
import { useTheme } from '@mui/material';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { faChevronLeft, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import useResponsive from '../../../hooks/useResponsive';
import {
  CrewEntriesPerPageSelector,
  CrewPagination,
  CrewTableModal,
  CrewTableSearch,
} from '../../../components/molecules';
import { CrewTableModalProps, CrewTableNameProps } from '../../../types/CrewTable';
import { CrewIconProps } from '../../../types/CrewIconProps';

export interface Instalment {
  id?: string;
  name?: string;
  dueDate?: string;
  amount?: number;
  isActive?: boolean;
}

export interface FeeStructure {
  id?: string;
  name?: string;
  planTypeId?: string;
  feeTypeId?: string;
  planType?: string;
  feeType?: string;
  amount?: number;
  noOfInstallments?: number;
  hostelId?: string;
  isEditable?: boolean;
  showEditButton?: boolean;
  installments?: Instalment[];
  total?: number;
}

interface FeeStructureTableProps {
  feeStructures: FeeStructure[];
  onActionSelect: (action: string) => void;
  tableName: string;
  handleEditClick?: () => void;
  Modal: CrewTableModalProps;
  onSetSelectedRow?: (row: any) => void;
  tableNameIcon?: CrewIconProps;
  tableNameIconPlacementPosition?: 'left' | 'right';
}

export const CrewFeeStructureTable = ({
  feeStructures,
  onSetSelectedRow,
  tableName,
  Modal,
  ...props
}: FeeStructureTableProps) => {
  const theme = useTheme();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [PageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [searchedData, setSearchedData] = useState(feeStructures);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleItemsPerPageChange = (newValue: number) => {
    setPageSize(newValue);
  };

  const tableRef = useRef<HTMLDivElement>(null);
  const isMobile = useResponsive({ query: 'between', key: 'md', start: 'xs', end: 'md' });

  const handleScrollLeft = () => {
    if (tableRef.current) {
      tableRef.current.scrollLeft -= 100;
    }
  };

  const handleScrollRight = () => {
    if (tableRef.current) {
      tableRef.current.scrollLeft += 100;
    }
  };

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

  const handleSearch = (searchQuery: string) => {
    const filteredData = feeStructures.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
    );
    setSearchedData(filteredData);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchedData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, searchedData]);

  const getMaxNoOfInstallments = (data: FeeStructure[]) => {
    let maxNoOfInstallments = 0;

    data.forEach((item) => {
      const numberOfInstallments = item?.noOfInstallments ?? 0; // provide 0 as default if noOfInstallments is undefined
      if (numberOfInstallments > maxNoOfInstallments) {
        maxNoOfInstallments = numberOfInstallments;
      }
    });

    return maxNoOfInstallments;
  };
  const numberOfInstalments = getMaxNoOfInstallments(feeStructures); // TODO: Nikita will update this with after comparison

  const displayInstalmenstHeaderTop = (numberOfInstalments: number) => {
    let temp = [];
    for (let i = 1; i <= numberOfInstalments; i++) {
      temp.push(
        <TableCell key={`header-${i}`} colSpan={2}>
          <CrewTypography className="column-width" variant="subtitle2">{`Instalment ${i}`}</CrewTypography>
        </TableCell>,
      );
    }
    return temp;
  };

  const displayInstalmenstHeaderBottom = (numberOfInstalments: number) => {
    let temp = [];
    for (let i = 1; i <= numberOfInstalments; i++) {
      temp.push(
        <React.Fragment key={`bottom-${i}`}>
          <TableCell>
            <CrewTypography variant="subtitle2" className="column-width">
              Date
            </CrewTypography>
          </TableCell>
          <TableCell>
            <CrewTypography variant="subtitle2" className="column-width">
              Amount
            </CrewTypography>
          </TableCell>
        </React.Fragment>,
      );
    }
    return temp;
  };

  useEffect(() => {
    setSearchedData(feeStructures);
  }, [feeStructures]);

  return (
    <Stack className="fees-structre-table container">
      <Stack spacing={2} className="wrapper">
        <CrewTableName tableName={tableName} labelVariant="h4" />
        <Stack className="table-page-search" spacing={{ xs: 2, sm: 1 }} direction={{ lg: 'row' }}>
          <CrewEntriesPerPageSelector pageSize={PageSize} onChange={handleItemsPerPageChange} />
          <CrewTableSearch onSearch={(value) => handleSearch(value)} />
        </Stack>
        <TableContainer ref={tableRef} className={`${getThemeModeClass(theme.palette.mode)} feestructure `}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} className={`column-sticky ${!isMobile && 'first-col'}`}>
                  <CrewTypography variant="subtitle2" className="column-width">{`Name`}</CrewTypography>
                </TableCell>
                <TableCell rowSpan={2} className={`column-sticky ${!isMobile && ' second-col'}`}>
                  <CrewTypography variant="subtitle2" className="column-width">{`Plan Type`}</CrewTypography>
                </TableCell>
                <TableCell rowSpan={2} className={`column-sticky ${!isMobile && ' third-col'}`}>
                  <CrewTypography variant="subtitle2" className="column-width">{`Fee Type`}</CrewTypography>
                </TableCell>
                <TableCell rowSpan={2} className={`column-sticky ${!isMobile && ' fourth-col'}`}>
                  <CrewTypography variant="subtitle2" className="column-width">{`Amount`}</CrewTypography>
                </TableCell>
                <TableCell rowSpan={2} className={`column-sticky ${!isMobile && ' fivth-col'}`}>
                  <CrewTypography variant="subtitle2" className="column-width">{`No. of Instalments`}</CrewTypography>
                </TableCell>
                {displayInstalmenstHeaderTop(numberOfInstalments)}
                <TableCell rowSpan={2} className="column-sticky edit">
                  <CrewTypography variant="subtitle2" className="column-width">{`Edit`}</CrewTypography>
                </TableCell>
              </TableRow>
              <TableRow>{displayInstalmenstHeaderBottom(numberOfInstalments)}</TableRow>
            </TableHead>
            <TableBody>
              {currentTableData.map((feeStructure, index) => (
                <TableRow key={index}>
                  <TableCell className={`${!isMobile && 'column-sticky first-col'}`}>
                    <CrewTypography variant="caption">{feeStructure.name}</CrewTypography>
                  </TableCell>
                  <TableCell className={`${!isMobile && 'column-sticky second-col'}`}>
                    <CrewTypography variant="caption"> {feeStructure.planType}</CrewTypography>
                  </TableCell>
                  <TableCell className={`${!isMobile && 'column-sticky third-col'}`}>
                    <CrewTypography variant="caption"> {feeStructure.feeType}</CrewTypography>
                  </TableCell>
                  <TableCell className={`${!isMobile && 'column-sticky fourth-col'}`}>
                    <CrewTypography variant="caption"> {feeStructure.amount}</CrewTypography>
                  </TableCell>
                  <TableCell className={`${!isMobile && 'column-sticky fivth-col'}`}>
                    <CrewTypography variant="caption"> {feeStructure.noOfInstallments}</CrewTypography>
                  </TableCell>
                  {Array.from({ length: numberOfInstalments }).map((_, index) => (
                    <React.Fragment key={index}>
                      <TableCell>
                        <CrewTypography variant="caption">
                          {feeStructure?.installments?.[index]?.dueDate ?? '-'}
                        </CrewTypography>
                      </TableCell>
                      <TableCell>
                        <CrewTypography variant="caption">
                          {feeStructure?.installments?.[index]?.amount ?? '-'}
                        </CrewTypography>
                      </TableCell>
                    </React.Fragment>
                  ))}
                  <TableCell className="column-sticky edit">
                    <Stack
                      className="table-edit-icon"
                      component="span"
                      onClick={(e) => handleEditClick(e, feeStructure)}
                    >
                      <CrewIcon icon={faEllipsis} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {!isMobile && (
          <Stack className="scroll-buttons">
            <CrewButton className="btn-1" onClick={handleScrollLeft}>
              <CrewIcon icon={faChevronLeft} />
            </CrewButton>
            <CrewButton className="btn-2" onClick={handleScrollRight}>
              <CrewIcon icon={faChevronRight} />
            </CrewButton>
          </Stack>
        )} */}
        <Grid container className="table-pagination-row">
          <Grid className="table-pagination-row-entries" item xs={12} sm={12} md={6} lg={6} xl={6} px={1}>
            <CrewTableInfo currentPage={currentPage} itemsPerPage={PageSize} totalItems={feeStructures?.length ?? 0} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} px={1}>
            <CrewPagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={feeStructures?.length}
              pageSize={PageSize}
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
    </Stack>
  );
};

export default CrewFeeStructureTable;
