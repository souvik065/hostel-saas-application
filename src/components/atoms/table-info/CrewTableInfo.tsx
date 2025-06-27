import { TableInfoProps } from '@/types/TableInfoProps';
import CrewTypography from '../typography/CrewTypography';

const CrewTableInfo = ({ currentPage, itemsPerPage, totalItems, variant = 'caption' }: TableInfoProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <CrewTypography variant={variant}>
      Showing {startIndex} to {endIndex} of {totalItems} entries
    </CrewTypography>
  );
};

export default CrewTableInfo;
