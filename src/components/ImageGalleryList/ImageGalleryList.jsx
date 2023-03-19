import css from './ImageGalleryList.module.css';

export const ImageGalleryList = ({ children }) => {
  return <ul className={css.imageGalleryList}>{children}</ul>;
};
