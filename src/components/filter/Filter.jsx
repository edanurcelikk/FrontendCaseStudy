import clsx from "clsx";
import "Filter/Filter.css";

function Filter({
  brandOptions = [],
  colorOptions = [],
  sortOptions = [],
  selectedBrand,
  selectedColor,
  selectedSort,
  onBrandChange,
  onColorChange,
  onSortChange,
  colorsCount = {},
  brandCount = {},
}) {
  return (
    <div className="filter-container">
      <div className="color-container">
        <p>
          <b>Renk</b>
        </p>
        <ul className="color-list">
          {colorOptions.map((color) => (
            <li
              key={color}
              onClick={() => {
                onColorChange(color);
              }}
              className={clsx("color-item", {
                selected: color === selectedColor,
              })}
            >
              {color} {colorsCount[color] ? `(${colorsCount[color]})` : null}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>
          <b>Sıralama</b>
        </p>
        <ul className="sort-list">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={clsx("sort-item", {
                selected: option.value === selectedSort,
              })}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>
          <b>Marka</b>
        </p>
        <ul className="brand-list">
          {brandOptions.map((brand) => (
            <li
              key={brand}
              className={clsx("brand-item", {
                selected: brand === selectedBrand,
              })}
              onClick={() => onBrandChange(brand)}
            >
              {brand}
              {brandCount[brand] ? ` (${brandCount[brand]})` : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
