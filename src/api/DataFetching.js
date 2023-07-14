import axios from 'axios';

// endpoint
const baseUrl = 'https://api.beta-a2b.work';

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
export const fetchSearchEndpoint = (params,token) => {
  const searchEndpoint = `${baseUrl}/${token}/search/info`;
  // return params
  return apiCall(searchEndpoint,params);
};
//api thong tin khach hang
export const fetchProfileUser = (token) => { // nhan tham so la params la 1 object
  const profileEndpoint = `${baseUrl}/${token}/profile/get`;
  return apiCall(profileEndpoint);
}
//lay gps
export const fetchStartGPS = (params,token) => {
  const updateGPS = `${baseUrl}/${token}/search/address`;
  // return params
  return apiCall(updateGPS,params);
}
