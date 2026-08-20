import { Button } from "./Button";
import { CyberText } from "./CyberText";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 w-full">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <div className="flex space-x-1 gap-1 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-sans text-sm transition-all interactive cursor-none hover:scale-110 ${
              currentPage === page
                ? "bg-[#FF5A36] text-white font-semibold shadow-lg shadow-[#FF5A36]/30 scale-110"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-muted dark:hover:bg-white/10"
            }`}
          >
            <CyberText text={String(page)} speed={20} />
          </button>
        ))}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
