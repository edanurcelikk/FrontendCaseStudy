import "Select/Select.css";

function Select({ value, label, onChange, options = [], placeholder = "" }) {
  return (
    <div className="select-container">
      {label && <label className="label">{label}</label>}
      <select
        key={value}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
