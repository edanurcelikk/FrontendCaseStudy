import React from 'react'

function Pagination({ count, page, onChange, style, children }) {

    const pages = Array.from({ length: count }, (v, i) => i + 1)

    const goToNext = () => { if (page < count) onChange(page + 1) }

    const goToPrevious = () => { if (page > 1) onChange(page - 1) }


    return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* left button */}
            <button onClick={goToPrevious}
                disabled={page === 1}
                style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid gray',
                    backgroundColor: 'white',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    opacity: page === 1 ? 0.5 : 1
                }}
            >←</button>

            {pages.map((p) => (
                <button key={p} style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid gray',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                }} onClick={() => { onChange(p) }}>{p}</button>
            ))}
            {/* onchange ile sayfa sayımı güncelledim */}

            {/* right button */}
            <button onClick={goToNext} disabled={page === count} style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid gray',
                backgroundColor: 'white',
                cursor: page < count ? 'pointer' : 'not-allowed',
                opacity: page === count ? 0.5 : 1
            }}>→</button>


        </div>
    )
}

export default Pagination