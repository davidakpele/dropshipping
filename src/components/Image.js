import { useState } from "react";

const Image = ({ src, alt, ldClassName, className, style, refFunc }) => {
  const [showImg, setShowImg] = useState(false);

  const styleUse = style || {};

  return (
    <>
      {!showImg ? (
        <div
          className={`${ldClassName || className} placeholder`}
          style={styleUse || {}}
        ></div>
      ) : null}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ ...styleUse, ...(showImg ? {} : { display: "none" }) }}
        onLoad={(e) => {
          setShowImg(true);
          if (refFunc) refFunc(e.target);
        }}
      />
    </>
  );
};

export default Image;
