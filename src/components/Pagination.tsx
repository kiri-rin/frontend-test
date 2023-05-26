import { CPagination, CPaginationItem } from "@coreui/react";
import React from "react";
import { CPaginationProps } from "@coreui/react/dist/components/pagination/CPagination";

type PaginationProps = {
  page: number;
  onChangePage: (value: number) => any;
  totalPages: number;
  maxVisiblePages?: number;
};
export const Pagination = ({
  page,
  onChangePage,
  totalPages,
  maxVisiblePages = 3,
  ...props
}: PaginationProps & CPaginationProps) => {
  const activePageOffset = Math.floor(maxVisiblePages / 2);
  const firstShownPage =
    activePageOffset > page - 1
      ? 0
      : Math.min(page - activePageOffset, totalPages - maxVisiblePages);
  const visiblePages = Math.min(totalPages - firstShownPage, maxVisiblePages);
  return (
    <CPagination align="end" aria-label="Page navigation example" {...props}>
      <CPaginationItem
        onClick={() => onChangePage(page - 1)}
        disabled={page <= 0}
      >
        Previous
      </CPaginationItem>
      {!!firstShownPage && (
        <>
          <CPaginationItem onClick={() => onChangePage(0)} key={0}>
            1
          </CPaginationItem>
          <CPaginationItem active={false} disabled={true} key={"..."}>
            ...
          </CPaginationItem>
        </>
      )}
      {Array(visiblePages)
        .fill(0)
        .map((it, index) => (
          <CPaginationItem
            active={firstShownPage + index === page}
            onClick={() => onChangePage(firstShownPage + index)}
            key={firstShownPage + index}
          >
            {firstShownPage + index + 1}
          </CPaginationItem>
        ))}
      <CPaginationItem
        disabled={totalPages <= page + 1}
        onClick={() => onChangePage(page + 1)}
      >
        Next
      </CPaginationItem>
    </CPagination>
  );
};
