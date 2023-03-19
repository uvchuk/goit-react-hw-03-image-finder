import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
  };

  handleGetQuery = searchQuery => {
    this.setState({ query: searchQuery });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleGetQuery} />
        <ImageGallery searchQuery={this.state.query} />
      </>
    );
  }
}
export default App;
