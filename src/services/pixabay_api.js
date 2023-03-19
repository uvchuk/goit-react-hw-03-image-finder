const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33452758-d0eb9a3e8a096b344e09ec5f3';

const getImages = (searchQuery, page = 1) => {
  const options = 'image_type=photo&orientation=horizontal&per_page=12';
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&${options}`
  ).then(res => {
    if (res.ok) return res.json();
    else return Promise.reject(new Error('No response from server'));
  });
};

const api = {
  getImages,
};

export default api;
