import axios from 'axios';

// endpoint
const baseUrl = 'https://api.beta-a2b.work';
// const searchEndpoint = `${baseUrl}/${api_key}/search/info?`;
const settingEndpoint = `${baseUrl}/e1358385819f12b01db7990c1/profile/get`;
// const bankNameEndpoint = `${baseUrl}/${api_key}/bank/list`;

const reviewListEndpoint = (id) => `${baseUrl}/rate/filterCustomer?customer_id=${id}`;

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

const postApi = async (endpoint, data) => {
    const options = {
        method: 'POST',
        url: endpoint,
        data: data ? data : {},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //dữ liệu sẽ được mã hóa dưới dạng chuỗi query string và được gửi qua body của yêu cầu HTTP
        }
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
export const fetchSearchEndpoint = (params, token) => {
  const searchEndpoint = `${baseUrl}/${token}/search/info`;
  // return params
  return apiCall(searchEndpoint,params);
}
//lich su tim kiem
export const fetchHistorySearch = (token) => {
    const historySearch = `${baseUrl}/${token}/history/search`;
    return apiCall(historySearch)
}
//danh gia
export const fetchSettingEndpoint = (params) => {
    return apiCall(settingEndpoint, params);
};
export const fetchBankNameEndpoint = (params) => {
    return apiCall(bankNameEndpoint, params);
};

export const fetchReviewListEndpoint = (id) => {
    return apiCall(reviewListEndpoint(id));
};
//api thong tin khach hang
export const fetchProfileUser = (token) => { // nhan tham so la params la 1 object
    const profileEndpoint = `${baseUrl}/${token}/profile/get`;
    return apiCall(profileEndpoint);
}
//lay gps
export const fetchStartGPS = (params, token) => {
    const updateGPS = `${baseUrl}/${token}/search/address`;
    // return params
    return apiCall(updateGPS,params);
}
//tao chuyen di
export const fetchCreateOneTrip = (data, token) => {
    // return data;
    const createTrip = `${baseUrl}/${token}/trip/create`;
    return postApi(createTrip,data);
}
//danh muc loai xe
export const fetchListCategoryVehicle = (token) => {
    const listCategoryVehicle = `${baseUrl}/${token}/category/list`;
    return apiCall(listCategoryVehicle);
}
//lấy thông tin mycar
export const fetchListMyCar = (token) => {
    const ListMyCar = `${baseUrl}/${token}/vehicle/get`;
    return apiCall(ListMyCar);
}
//cập nhật thông tin mycar
export const fetchUpdateMycar = (data, token) => {
    const createTrip = `${baseUrl}/${token}/vehicle/update`;
    return postApi(createTrip,data);
}