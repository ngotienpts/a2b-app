import axios from 'axios';

// endpoint
const api_key = 'f13a8144ad84e2a97df6805f5';
const baseUrl = 'https://api.beta-a2b.work';
const searchEndpoint = `${baseUrl}/${api_key}/search/info?`;
const settingEndpoint = `${baseUrl}/e1358385819f12b01db7990c1/profile/get`;
const bankNameEndpoint = `${baseUrl}/${api_key}/bank/list`;

const reviewListEndpoint = (id) => `${baseUrl}/rate/filterCustomer?customer_id=${id}`;
const myCarEndpoint = (id) => `${baseUrl}/79ee7846612b106c445826c19/vehicle/get`;

// fallback Image
export const fallbackImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

//   call api
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

export const fetchSearchEndpoint = (params) => {
    return apiCall(searchEndpoint, params);
};
export const fetchSettingEndpoint = (params) => {
    return apiCall(settingEndpoint, params);
};
export const fetchBankNameEndpoint = (params) => {
    return apiCall(bankNameEndpoint, params);
};

export const fetchReviewListEndpoint = (id) => {
    return apiCall(reviewListEndpoint(id));
};
export const fetchMyCarEndpoint = (id) => {
    return apiCall(myCarEndpoint(id));
};
