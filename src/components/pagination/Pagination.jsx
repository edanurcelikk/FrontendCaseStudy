import "Pagination/Pagination.css";
import clsx from "clsx";

function Pagination({ count, page, onChange }) {
  const pages = Array.from({ length: count }, (v, i) => i + 1);

  const goToNext = () => {
    if (page < count) onChange(page + 1);
  };

  const goToPrevious = () => {
    if (page > 1) onChange(page - 1);
  };

  return (
    <div className="pagination-container">
      <button
        onClick={goToPrevious}
        disabled={page === 1}
        className={clsx("pagination-btn-left", { disabled: page === 1 })}
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          className="pagination-btn"
          key={p}
          onClick={() => {
            onChange(p);
          }}
        >
          {p}
        </button>
      ))}
      {/* onchange ile sayfa sayımı güncelledim */}

      <button
        onClick={goToNext}
        disabled={page === count}
        className={clsx("pagination-btn-right", { disabled: page === count })}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
