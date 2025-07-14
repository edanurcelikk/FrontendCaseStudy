import React from 'react'

function Button({ className, onClick, style = {}, children, disabled }) {
    const disabledStyle = {
        ...style,
        cursor: disabled ? 'not-allowed' : style.cursor || 'pointer',
        backgroundColor: disabled ? 'gray' : style.backgroundColor,
        color: disabled ? 'white' : style.color
    }
    return (
        <button
            className={className}
            onClick={onClick}
            style={disabledStyle}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button