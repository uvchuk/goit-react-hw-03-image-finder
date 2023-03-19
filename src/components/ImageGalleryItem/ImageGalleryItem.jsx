import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li className={css.galleryItem} key={id}>
        <img
          className={css.galleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => {
            onClick(largeImageURL, tags);
          }}
        />
      </li>
    );
  });
};
