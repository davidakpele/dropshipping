import { useEffect, useState } from "react";

const Image = ({
  src,
  fallbackSrc,
  alt,
  ldClassName,
  className,
  style,
  refFunc,
}) => {
  const [showImg, setShowImg] = useState(false);
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setShowImg(false);
    setImageSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const styleUse = style || {};
  const hasFallback = Boolean(fallbackSrc);

  return (
    <>
      {!showImg && !hasFallback ? (
        <div
          className={`${ldClassName || className} placeholder`}
          style={styleUse || {}}
        ></div>
      ) : null}
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        style={{
          ...styleUse,
          ...(showImg || hasFallback ? {} : { display: "none" }),
        }}
        onError={() => {
          if (fallbackSrc && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }}
        onLoad={(e) => {
          setShowImg(true);
          if (refFunc) refFunc(e.target);
        }}
      />
    </>
  );
};

export default Image;
