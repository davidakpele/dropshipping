
const Specification = ({ data, dat }) => {
  if (data) {
    const features = dat?.features ?? data.features;
    const { model, name, color, sku, weight_kg } = data;
    return (
      <div>
        <div className="details">
          <div className="details_parts">
            <div className="key_features">
              <h3 className="features">KEY FEATURES</h3>
              <ul className="features_lists">
                {features?.map((itm, idx) => (
                  <li className="features_listed" key={idx}>
                    {itm}
                  </li>
                ))}
              </ul>

              <div className="specs">
                <h3 className="specs_second">SPECIFICATION</h3>
                {sku ? (
                  <h3 className="specs_info">SKU: {sku}</h3>
                ) : (
                  <h3 className="specs_info">MODEL: {model}</h3>
                )}
                <h3 className="specs_info">
                  PRODUCT: &nbsp;&nbsp;<span>{name}</span>
                </h3>
                <h3 className="specs_info">
                  COLOR : &nbsp;&nbsp;&nbsp;<span>{color}</span>
                </h3>
                {weight_kg !== undefined ? (
                  <h3 className="specs_info">
                    WEIGHT (kg): &nbsp;&nbsp;&nbsp;<span>{weight_kg}</span>
                  </h3>
                ) : (
                  <h3 className="specs_info">
                    QUANTITY: &nbsp;&nbsp;&nbsp;<span>{"static_quantity"}</span>
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Specification;
