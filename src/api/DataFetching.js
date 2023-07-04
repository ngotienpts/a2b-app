import axios from 'axios';

// endpoint
const apiKey = 'e1358385819f12b01db7990c1';
const baseUrl = 'https://api.beta-a2b.work';
const searchEndpoint = `${baseUrl}/${apiKey}/search/info?`;
const profileEndpoint = `${baseUrl}/${apiKey}/profile/get`;

// fallback Image
export const fallbackImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

// call api
const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('Error', error);
    return {};
  }
};
//api tim kiem
export const fetchSearchEndpoint = (params) => {
  return apiCall(searchEndpoint, params);
};
//api thong tin khach hang
export const fetchProfileUser = () => { // nhan tham so la params la 1 object
  return apiCall(profileEndpoint);
}
