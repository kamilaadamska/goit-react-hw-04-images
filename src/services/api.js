import axios from 'axios';

const API_URL = 'https://pixabay.com/api';
const API_KEY = '36365586-331bc85183b3fd7ba137836b3';
export const PER_PAGE = 12;

export const fetchImages = async (searchedPhrase, pageNo) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        q: searchedPhrase,
        page: pageNo,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: PER_PAGE,
      },
    });
    if (response.data.hits.length === 0) throw new Error();
    if (searchedPhrase === '') throw new Error();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
