import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li className={css.galleryItem} key={id}>
        <img className={css.galleryItemImage} src={webformatURL} alt={tags} />
      </li>
    );
  });
};
