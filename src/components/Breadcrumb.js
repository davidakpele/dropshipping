import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink, useParams } from "react-router-dom";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();
  const { id } = useParams();

  return (
    <div className="breadcrum">
      <div className="container">
        <p>
          {breadcrumbs.map(
            ({ match, breadcrumb }) =>
              breadcrumb !== "Home" && (
                <React.Fragment key={match.pathname}>
                  {breadcrumb.props.children % 1 !== 0 && (
                    <>
                      <NavLink
                        to={
                          !breadcrumb.key.includes("/product-details")
                            ? match.pathname
                            : `/product-details/${id}`
                        }
                      >
                        {breadcrumb}
                      </NavLink>
                      <span className="breadcrumb-separator"> {">"} </span>
                    </>
                  )}
                </React.Fragment>
              )
          )}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumb;
