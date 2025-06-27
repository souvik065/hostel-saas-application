import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../../hooks/usePagination';
import { CrewPaginationProps } from '../../../types/CrewPaginationProps';
import { useTheme } from '@mui/material';
import { CrewTypography } from '../../atoms';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CrewIcon from '../../atoms/icon/CrewIcon';

import './CrewPagination.scss';

const CrewPagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = '',
  labelVariant = 'subtitle2',
}: CrewPaginationProps) => {
  const theme = useTheme();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  const getBackgroundColorClass = () => {
    return theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode';
  };

  return (
    <div className={`${getBackgroundColorClass()}`}>
      <ul className={classnames('pagination-container', { [className]: className })}>
        <li
          className={classnames('pagination-item previousbtn', {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <CrewIcon icon={faCaretLeft} />
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <CrewTypography variant={labelVariant} key={index} className="pagination-item dots">
                &#8230;
              </CrewTypography>
            );
          }

          return (
            <li
              key={index}
              className={classnames('pagination-item pagination-numbers', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              <CrewTypography variant="subtitle2"> {pageNumber}</CrewTypography>
            </li>
          );
        })}
        <li
          className={classnames('pagination-item nextbtn', {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <CrewIcon icon={faCaretRight} />
        </li>
      </ul>
    </div>
  );
};

export default CrewPagination;
