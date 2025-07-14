import React from 'react'

function Select({ value, label, onChange, className, options = [], style, placeholder = '' }) {
    return (
        <div className='select-container'>
            {label && <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>}
            <select value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    width: '200px',
                    fontSize: '14px',
                }} >
                <option value="" disabled hidden> {placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}

            </select>

        </div>
    )
}

export default Select