import galleryAPI from '../../services/pixabay_api';
import { Component } from 'react';
import { Notify } from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
    openedImage: null,
    totalHits: null,
  };

  componentDidUpdate(prevProps) {
    const currentQuery = this.props.searchQuery;
    const prevQuery = prevProps.searchQuery;
    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending', page: 1 });
      galleryAPI
        .getImages(currentQuery)
        .then(({ hits, totalHits }) => {
          if (hits.length > 0)
            this.setState({
              images: hits,
              status: 'resolved',
              page: 2,
              totalHits,
            });
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

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    const currentQuery = this.props.searchQuery;
    const currentPage = this.state.page;
    galleryAPI
      .getImages(currentQuery, currentPage)
      .then(({ hits }) => {
        if (hits.length > 0)
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
          }));
        else
          return Promise.reject(
            new Error(`No matches with query: ${currentQuery}`)
          );
      })
      .catch(error =>
        this.setState({ error: error.message, status: 'rejected' })
      );
  };

  handleOpenPicture = (src, tags) => {
    const openedImage = {
      src,
      tags,
    };
    this.setState({ openedImage });
  };

  handleClosePicture = evt => {
    if (evt.target.nodeName === 'DIV' || evt.code === 'Escape')
      this.setState({ openedImage: null });
  };

  render() {
    const { images, status, error, openedImage, totalHits } = this.state;
    if (status === 'idle') return <h3>Enter your search request</h3>;
    if (status === 'pending') return <Loader />;
    if (status === 'rejected') return Notify.failure(error);
    if (status === 'resolved')
      return (
        <>
          <ImageGalleryList>
            <ImageGalleryItem
              images={images}
              onClick={this.handleOpenPicture}
            />
          </ImageGalleryList>
          {images.length < totalHits ? (
            <Button onClick={this.onLoadMore} />
          ) : (
            Notify.info(`Last matches with query: ${this.props.searchQuery}`)
          )}
          {openedImage && (
            <Modal
              openedImage={openedImage}
              onClick={this.handleClosePicture}
            />
          )}
        </>
      );
  }
}
export default ImageGallery;
