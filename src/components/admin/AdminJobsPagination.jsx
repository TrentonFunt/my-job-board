
/**
 * Pagination component for admin jobs panel.
 * Props:
 * - currentPage: number
 * - totalPages: number
 * - onPageChange: function(page: number)
 */
export default function AdminJobsPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <button
        className="btn btn-sm"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="px-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn btn-sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
