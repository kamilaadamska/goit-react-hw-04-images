import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Component } from 'react';
import { fetchImages, PER_PAGE } from 'services/api';
import { Error } from './Error';
import { Modal } from './Modal';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: '',
    currentPage: 1,
    searchedPhrase: '',
    totalPages: 0,
    show: false,
    imgUrl: '',
    tags: '',
  };

  getSearchedPhrase = e => {
    e.preventDefault();
    const searchForm = e.target;
    const searchedWord = searchForm.elements.searchQuery.value;
    if (searchedWord !== this.state.searchedPhrase) {
      this.setState({
        searchedPhrase: searchedWord,
        currentPage: 1,
        images: [],
      });
    }
  };

  getImages = async () => {
    const { searchedPhrase, currentPage } = this.state;

    try {
      this.setState({ isLoading: true, error: '', totalPages: 0 });
      const newData = await fetchImages(searchedPhrase, currentPage);
      const newImages = newData.hits;
      if (newImages) {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          totalPages: Math.ceil(newData.totalHits / PER_PAGE),
        }));
      } else {
        throw new Error();
      }
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
        totalPages: 0,
      });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchedPhrase, currentPage, show } = this.state;

    if (
      searchedPhrase !== prevState.searchedPhrase ||
      currentPage !== prevState.currentPage
    ) {
      this.getImages();
    }

    if (show) {
      const modal = document.getElementById('modal');
      modal.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  toggleModal = e => {
    if (e.currentTarget !== e.target) {
      return;
    }
    const url = e.target.dataset.imageurl;
    const tagsForalt = e.target.alt;
    this.setState(prevState => ({
      show: !prevState.show,
      imgUrl: url,
      tags: tagsForalt,
    }));
  };

  onKeyDown = e => {
    e.preventDefault();
    if (e.key === 'Escape') {
      this.setState(prevState => ({
        show: !prevState.show,
      }));
    }
  };

  render() {
    const {
      images,
      isLoading,
      error,
      currentPage,
      totalPages,
      show,
      imgUrl,
      tags,
    } = this.state;

    return (
      <>
        <Searchbar findImages={this.getSearchedPhrase} />
        <ImageGallery images={images} onClick={this.toggleModal} />
        {show && (
          <Modal
            imgUrl={imgUrl}
            tagsForAlt={tags}
            hideModal={this.toggleModal}
            onKeyDown={this.onKeyDown}
          />
        )}
        {isLoading && <Loader />}
        {error && <Error />}
        {currentPage < totalPages && <Button onClick={this.loadMore} />}
      </>
    );
  }
}

export default App;
