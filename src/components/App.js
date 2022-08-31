import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ShowMoreButton from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import pixabayAPI from '../services/pixabay-api';
import s from './App.module.css';

function App(params) {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [pics, setPics] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const onScroll = () => {
      if (page > 1) {
        setTimeout(() => {
          window.scrollBy({
            top: window.innerHeight - 200,
            behavior: 'smooth',
          });
        }, 300);
      }
    };

    pixabayAPI(searchName, page)
      .then(pics => {
        if (pics.hits.length === 0) {
          return toast.error('Ничего не нашлось, попробуй изменить запрос');
        } else {
          let newPics;
          setShowButton(true);
          if (pics) {
            setPics(prevState => {
              prevState
                ? (newPics = [...prevState, ...pics.hits])
                : (newPics = [...pics.hits]);

              if (newPics.length === pics.totalHits) {
                setShowButton(false);
                setShowLoader(false);
              } else {
                setShowButton(true);
                setShowLoader(false);
              }

              return setPics(newPics);
            });

            onScroll();
          }
        }
      })
      .catch(error => toast.error(error));
  }, [searchName, page]);

  const getNameFromSeacrhbar = data => {
    if (data) {
      setSearchName(data);
      setPage(1);
      setPics(null);
      setShowButton(false);
    }
  };

  const onClickShowMore = () => {
    setPage(page + 1);
    setShowButton(false);
    setShowLoader(true);
  };

  const getLargeImage = src => {
    setLargeImage(src);
    setShowModal(true);
  };

  const onCloseModal = e => {
    setShowModal(false);
    setLargeImage('');
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={getNameFromSeacrhbar} />
      <ImageGallery pics={pics} onGetSrc={getLargeImage} />
      {showButton && <ShowMoreButton onClickShowMore={onClickShowMore} />}
      {showLoader && <Loader />}
      {showModal && <Modal src={largeImage} onCloseModal={onCloseModal} />}
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
