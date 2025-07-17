import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const leftSiblingIndex = Math.max(2, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add dots before the range if needed
    if (leftSiblingIndex > 2) {
      pages.push(-1); // Represents dots
    } else if (leftSiblingIndex === 2) {
      pages.push(2);
    }

    // Add pages in range
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add dots after the range if needed
    if (rightSiblingIndex < totalPages - 1) {
      pages.push(-2); // Represents dots
    } else if (rightSiblingIndex === totalPages - 1) {
      pages.push(totalPages - 1);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous Page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center">
          {getPageNumbers().map((pageNumber, i) => {
            if (pageNumber === -1 || pageNumber === -2) {
              return (
                <div
                  key={`dots-${i}`}
                  className="flex h-9 w-9 items-center justify-center text-sm"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              );
            }

            return (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  "h-9 w-9",
                  pageNumber === currentPage && "pointer-events-none"
                )}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next Page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
} 