import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { fetchImages, PER_PAGE } from 'services/api';
import { Error } from './Error';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';
import { ModalContext } from 'hooks/modalContext';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPhrase, setSearchedPhrase] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  const getSearchedPhrase = e => {
    e.preventDefault();
    const searchForm = e.target;
    const searchedWord = searchForm.elements.searchQuery.value;
    if (searchedWord !== searchedPhrase) {
      setSearchedPhrase(searchedWord);
      setCurrentPage(1);
      setImages([]);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true);
        setError('');
        setTotalPages(0);

        const newData = await fetchImages(searchedPhrase, currentPage);
        const newImages = newData.hits;
        if (newData !== 'empty') {
          setImages(prevImages => [...prevImages, ...newImages]);
          setIsLoading(false);
          setTotalPages(Math.ceil(newData.totalHits / PER_PAGE));
        } else if (newData === 'empty') {
          setIsLoading(false);
          setImages([]);
        } else {
          throw new Error();
        }
      } catch (error) {
        setIsLoading(false);
        setError(error);
        setTotalPages(0);
      }
    };

    getImages();
  }, [searchedPhrase, currentPage]);

  useEffect(() => {
    if (show) {
      const modal = document.getElementById('modal');
      modal.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  const toggleModal = e => {
    if (e.currentTarget !== e.target) {
      return;
    }
    const url = e.target.dataset.imageurl;
    const tagsForalt = e.target.alt;

    setShow(prevShow => !prevShow);
    setModalDetails({ imgUrl: url, tags: tagsForalt });
  };

  const onKeyDown = e => {
    e.preventDefault();
    if (e.key === 'Escape') {
      setShow(prevShow => !prevShow);
    }
  };

  return (
    <>
      <Searchbar findImages={getSearchedPhrase} />
      <ModalContext.Provider value={{ toggleModal }}>
        <ImageGallery images={images} />
        {show && <Modal imgDetails={modalDetails} onKeyDown={onKeyDown} />}
      </ModalContext.Provider>
      {isLoading && <Loader />}
      {error && <Error />}
      {currentPage < totalPages && <Button onClick={loadMore} />}
    </>
  );
};
