import React from 'react'

function CardContent({ image, name, brand, color, discountedPrice, originalPrice, rate, imageStyle, showBrandLabel = false, showColorLabel = false, showOriginalPrice = false, showDiscountedPrice = false, showRate = false, children }) {
    return (
        <div>
            <img src={image} style={imageStyle} ></img>
            <p>{name}</p>
            {color && (
                <p>
                    {showColorLabel ? <p><b> Renk : </b> {color}</p> : null}
                </p>
            )}

            {brand && (
                <p>
                    {showBrandLabel ? <b>Marka: </b> : null}
                    {brand}
                </p>
            )}

            {discountedPrice && (
                <p>{showDiscountedPrice ? <p>{discountedPrice} TL</p> : null}</p>
            )}
            {originalPrice && (
                <p style={{ textDecoration: 'line-through', color: 'gray' }}>{showOriginalPrice ? <p>{originalPrice} TL  </p> : null}</p>
            )}
            {rate && (
                <p style={{ position: 'relative', bottom: '35px', left: '90px', color: 'red' }}> {showRate ? <p>{rate}%</p> : null}</p>
            )}


            <div>{children}</div>
        </div>
    )
}

export default CardContent