import { useState } from "react";


export const usePagination = ( totalItems, itemsPerPage ) => {


  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / +itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  return {
    startIndex,
    endIndex,
    totalPages,
    currentPage,
    setCurrentPage
  };
};