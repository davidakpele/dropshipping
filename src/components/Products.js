import Product, { ProductLoader } from "./Product";
import Empty from "./Empty";

const Products = ({ title, data, isNew, emptyMessage }) => {
  return (
    <section className="products-section">
      <div className="container-sm products-section__container">
        <div className="products-section__header">{title}</div>
        <div className="products-section__products">
          {!data
            ? new Array(6).fill(null).map((_, i) => <ProductLoader key={i} />)
            : data.length
            ? data.map((itm, id) => (
                <Product data={itm} key={itm.id ?? id} isNew={isNew} />
              ))
            : emptyMessage && <Empty emptyTitle={emptyMessage} />}
        </div>
      </div>
    </section>
  );
};

export default Products;
