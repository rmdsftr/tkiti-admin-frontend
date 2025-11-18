import "../styles/pagination.css"

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className = ""
}: PaginationProps) {
  
  const renderPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages.map((p, i) => (
      <button
        key={i}
        className={`page-button ${p === currentPage ? "active" : ""} ${p === "..." ? "dots" : ""}`}
        onClick={() => typeof p === "number" && onPageChange(p)}
        disabled={p === "..."}
        aria-label={typeof p === "number" ? `page-${p}` : "dots"}
      >
        {p}
      </button>
    ));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`pagination ${className}`} role="navigation" aria-label="pagination">
      <button
        className="pagination-nav"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="previous-page"
      >
        ‹ Previous
      </button>

      <div className="page-numbers">{renderPageNumbers()}</div>

      <button
        className="pagination-nav"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="next-page"
      >
        Next ›
      </button>
    </div>
  );
}

export default Pagination;