import React from 'react'

function Input({ type, placeholder, onChange, className, style }) {

    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
            style={style}
        ></input>
    )
}

export default Input