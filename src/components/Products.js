import Product, { ProductLoader } from "./Product";

const Products = ({ title, data, isNew }) => {
  return (
    <section className="products-section">
      <div className="container-sm products-section__container">
        <div className="products-section__header">{title}</div>
        <div className="products-section__products">
          {!data
            ? new Array(6).fill(null).map((_, i) => <ProductLoader key={i} />)
            : data.map((itm, id) => (
                <Product data={itm} key={id} isNew={isNew} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
