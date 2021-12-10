import React, { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import apiImages from './api/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loaderr from './components/Loader/Loader';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    setStatus(Status.PENDING);
    fetchImages();
  }, [query]);

  const fetchImages = () => {
    const options = { query, currentPage };
    apiImages
      .api(options)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images]);
        setCurrentPage(prevPage => prevPage + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(error => setStatus(Status.REJECTED));
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setCurrentPage(1);
    setImages([]);
    setStatus(Status.REJECTED);
  };

  const loadMore = () => {
    fetchImages();
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.REJECTED && <h1>Please enter a valid name!</h1>}
      {status === Status.PENDING && (
        <div className={s.Box}>
          <Loaderr />
        </div>
      )}
      {status === Status.RESOLVED && (
        <ImageGallery images={images} onClick={loadMore} />
      )}
    </div>
  );
}

export default App;
