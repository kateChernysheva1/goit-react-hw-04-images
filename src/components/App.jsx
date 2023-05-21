import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from 'components/Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showLoadMore, setShowLoadMore] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value;

    if (value.trim()) {
      setValue(prevState => {
        if (prevState !== value) {
          setPage(1);
          setImages([]);
          return value.trim();
        } else {
          setPage(prevStatePage => prevStatePage);
          setImages(prevStateImages => prevStateImages);
          return prevState;
        }
      });
    } else {
      Notiflix.Notify.failure('The field cannot be empty.');
    }
  };

  useEffect(() => {
    if (!value) {
      return;
    }

    const request = {
      API: 'https://pixabay.com/api/',
      KEY: '14059881-4edac1c6036b12acbb9b58250',
      per_page: 12,
    };

    const { API, KEY, per_page } = request;

    const searchParams = new URLSearchParams({
      q: value,
      page: page,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: per_page,
    });

    const getData = async () => {
      try {
        const response = await axios.get(`${API}?${searchParams}`);
        if (!response.data.totalHits) {
          setShowLoadMore(false);

          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          if (page === 1) {
            setImages([...response.data.hits]);
            Notiflix.Notify.info(
              `Hooray! We found ${response.data.totalHits} images.`
            );
          } else {
            setImages(prevState => [...prevState, ...response.data.hits]);
          }

          if (per_page * page >= response.data.totalHits) {
            setShowLoadMore(false);
            Notiflix.Notify.warning(
              "We're sorry, but you've reached the end of search results."
            );
          } else {
            setShowLoadMore(true);
          }
        }
      } catch (error) {
        setShowLoadMore(false);
        Notiflix.Notify.failure(
          'Sorry, some error on the server. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getData();
  }, [value, page]);

  const onClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onClickImage = e => {
    document.addEventListener('keydown', keyDown);
    setIsModal(true);
    setModalData({
      img: e.target.dataset.bgImage,
      alt: e.target.alt,
    });
  };

  const keyDown = e => {
    if (e.code === 'Escape') {
      document.removeEventListener('keydown', keyDown);
      setIsModal(false);
      setModalData({});
    }
  };

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      document.removeEventListener('keydown', keyDown);
      setIsModal(false);
      setModalData({});
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClickImage={onClickImage} />
      {images[0] && showLoadMore && !isLoading && <Button onClick={onClick} />}
      {isLoading && <Loader />}
      {isModal && <Modal data={modalData} closeModal={closeModal} />}
    </>
  );
}
