import "CardContent/CardContent.css";

function CardContent({
  image,
  name,
  brand,
  color,
  discountedPrice,
  originalPrice,
  rate,
  imageStyle,
  showBrandLabel = false,
  showColorLabel = false,
  showOriginalPrice = false,
  showDiscountedPrice = false,
  showRate = false,
  children,
}) {
  return (
    <div>
      <img src={image} style={imageStyle}></img>

      <p> {name}</p>
      {color && (
        <div>
          {showColorLabel ? (
            <div>
              <b> Renk : </b> {color}
            </div>
          ) : null}
        </div>
      )}

      {brand && (
        <div>
          {showBrandLabel ? <b>Marka: </b> : null}
          {brand}
        </div>
      )}

      {discountedPrice && (
        <div>{showDiscountedPrice ? <p>{discountedPrice} TL</p> : null}</div>
      )}

      {originalPrice && (
        <div className="original-price">
          {showOriginalPrice ? <p>{originalPrice} TL </p> : null}
        </div>
      )}

      {rate && <div className="rate">{showRate ? <p>{rate}%</p> : null}</div>}

      <div>{children}</div>
    </div>
  );
}

export default CardContent;
