import s from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState('');

  const onImgClick = src => {
    setShowModal(!showModal);
    setSrc(src);
  };

  const onClose = () => {
    setShowModal(false);
    setSrc('');
  };

  return (
    <>
      {images.map(image => (
        <li key={image.id} className={s.ImageGalleryItem}>
          <img
            className={s.ImageGalleryItemImage}
            src={image.webformatURL}
            alt="Item"
            onClick={() => onImgClick(image.largeImageURL)}
          />
        </li>
      ))}
      {showModal && <Modal onClose={onClose} img={src} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ImageGalleryItem: PropTypes.string,
    }),
  ),
};

export default ImageGalleryItem;
