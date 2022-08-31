import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ pics, onGetSrc }) {
  return (
    pics && (
      <div>
        <ul className={s.ImageGallery}>
          {pics.map(onePic => {
            return (
              <ImageGalleryItem
                key={onePic.id}
                img={onePic.webformatURL}
                largeImg={onePic.largeImageURL}
                alt={onePic.tags}
                onGetSrc={onGetSrc}
              />
            );
          })}
        </ul>
      </div>
    )
  );
}

ImageGallery.propTypes = {
  pics: PropTypes.arrayOf(PropTypes.shape),
  onGetSrc: PropTypes.func.isRequired,
};

export default ImageGallery;
