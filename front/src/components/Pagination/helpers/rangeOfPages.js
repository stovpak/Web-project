import { range } from './range';

export const rangeOfPages = (currentPage, pageRange, totalPages) => {
  if (currentPage < 3) {
    return range(1, pageRange);
  }
  if (currentPage >= 3 && currentPage < totalPages - 1) {
    return range(currentPage - 2, currentPage + 2);
  }
  if (currentPage === totalPages - 1) {
    return range(totalPages - pageRange + 1, totalPages + 1);
  }
  if (currentPage === totalPages) {
    return range(totalPages - pageRange + 1, totalPages);
  }
};
