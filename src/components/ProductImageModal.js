import { useState } from "react";

const ProductImageModal = ({ img, setShow_popup, activeProdImg }) => {
  const [activeProdModal, setActiveProdModal] = useState(activeProdImg);
  const closeModel = () => {
    setShow_popup(false);
    setActiveProdModal("");
  };
  const handeNext = () => {
    for (let i = 0; i < img.length; i++) {
      if (activeProdModal.id === img[i].id) {
        if (activeProdModal.id === img[img.length - 1].id) {
          setActiveProdModal(img[0]);
        } else {
          setActiveProdModal(img[i + 1]);
        }
      }
    }
  };
  const handePrev = () => {
    for (let i = 0; i < img.length; i++) {
      if (activeProdModal === img[i]) {
        if (activeProdModal === img[0]) {
          setActiveProdModal(img[img.length - 1]);
        } else {
          setActiveProdModal(img[i - 1]);
        }
      }
    }
  };
  const handleModalImg = (img) => {
    setActiveProdModal(img);
  };

  return (
    <div id="product-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModel}>
          &times;
        </span>
        <div className="modal-slide">
          <img
            src={activeProdModal.image_url}
            alt="Product-Image"
            className="prodImgSlides"
          />
          <div className="next-prev">
            <span onClick={handePrev} className="prev">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </span>
            <span onClick={handeNext} className="next">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </span>
          </div>
        </div>
        <div className="modalImages">
          {img.map((modalImages, index) => {
            return (
              <img
                key={index}
                src={modalImages.image_url}
                alt="product-images"
                className={`modalProdImages ${
                  modalImages.id === activeProdModal.id ? "borderAround" : ""
                }`}
                onClick={() => handleModalImg(modalImages)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductImageModal;
