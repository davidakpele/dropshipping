const Pagination = ({ links, setUrl }) => {
  return (
    <div className="paginate">
      {links?.map((link, i) => (
        <span
          className={`${link.active ? "active__page" : ""} ${
            i === 0 || i === links.length - 1 ? "display__none" : ""
          }`}
          key={i}
          onClick={() => setUrl(link.url)}
        >
          {link.label}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
