import React from 'react'
import Select from './Select'

function Filter({ brandOptions = [], colorOptions = [], sortOptions = [], selectedBrand, selectedColor, selectedSort, onBrandChange, onColorChange, onSortChange, colorsCount = {}, brandCount = {} }) {
    return (
        <div className='filter-container' style={{ marginLeft: '15px' }} >

            <div style={{ width: 'max-content', }}>
                <p><b>Renk</b></p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {colorOptions
                        .filter(color => colorsCount[color] > 0)
                        .map((color) => (
                            <li
                                key={color}
                                onClick={() => {
                                    onColorChange(color)
                                }}

                                style={{
                                    cursor: 'pointer',
                                    color: color === selectedColor ? 'orange' : 'black',
                                    marginBottom: '5px'

                                }}
                            >
                                {color} ({colorsCount[color] || 0})
                            </li>
                        ))}
                </ul>
            </div>

            <div>
                <p><b>Sıralama</b></p>
                <ul style={{ listStyle: 'none', padding: 0 }} >
                    {sortOptions.map((option) => (
                        <li key={option.value} style={{
                            cursor: 'pointer',
                            color: option.value === selectedSort ? 'orange' : 'black',
                            marginBottom: '5px'
                        }} onClick={() => onSortChange(option.value)}>{option.label}</li>
                    ))}
                </ul>
            </div>

            <div>
                <p><b>Marka</b></p>
                {brandOptions
                    .filter(brand => brandCount[brand] > 0)
                    .map((brand) => (
                        <li key={brand} style={{
                            cursor: 'pointer',
                            color: brand === selectedBrand ? 'orange' : 'black',
                            marginBottom: '5px',
                            listStyle: 'none', padding: 0
                        }} onClick={() => onBrandChange(brand)}>
                            {brand} ({brandCount[brand] || 0})
                        </li>
                    ))}

            </div>

        </div >
    )
}

export default Filter