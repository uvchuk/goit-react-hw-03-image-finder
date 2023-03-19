import { Component } from 'react';
import { Notify } from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import { Loader } from 'components/Loader/Loader';
import galleryAPI from '../../services/pixabay_api';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps) {
    const currentQuery = this.props.searchQuery;
    const prevQuery = prevProps.searchQuery;
    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending' });
      galleryAPI
        .getImages(currentQuery)
        .then(({ hits }) => {
          if (hits.length > 0)
            this.setState({ images: hits, status: 'resolved' });
          else
            return Promise.reject(
              new Error(`No matches with query: ${currentQuery}`)
            );
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }

  render() {
    const { images, status, error } = this.state;
    if (status === 'idle') return <h3>Enter your search request</h3>;
    if (status === 'pending') return <Loader />;
    if (status === 'rejected') return Notify.failure(error);
    if (status === 'resolved')
      return (
        <ImageGalleryList>
          <ImageGalleryItem images={images} />
        </ImageGalleryList>
      );
  }
}
export default ImageGallery;
