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
    const historySearch = `${baseUrl}/${token}/history/search?1`;
    return apiCall(historySearch)
}
//cai dat
export const fetchSettingEndpoint = (params) => {
    return apiCall(settingEndpoint, params);
};
//danh sach ngan hang
export const fetchBankNameEndpoint = (params,token) => {
    const bankNameEndpoint = `${baseUrl}/${token}/bank/list`;
    return apiCall(bankNameEndpoint, params);
};

//danh gia
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
    const updateGPS = `${baseUrl}/${token}/search/address?1`;
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
//danh sach thong bao
export const fetchListNoti = (token) => {
    const listNoti = `${baseUrl}/${token}/notification/list?1234`;
    return apiCall(listNoti);
}
//doc tat ca thong bao
export const fetchReadAllNoti = (token) => {
    const readAllNoti = `${baseUrl}/${token}/notification/read`;
    return postApi(readAllNoti);
}
//thong tin chi tiet chuyen di 
export const fetchDetailTrip = (params,token) => {
    const detailTrip = `${baseUrl}/${token}/trip/detail`;
    return apiCall(detailTrip,params);
}
//danh sach bao gia
export const fetchListReport = (params,token) => {
    const listReport = `${baseUrl}/${token}/report/list`;
    return apiCall(listReport,params);
}
//lich su chuyen di khach hang 
export const fetchListHistoryPassenger = (token) => {
    const listHistoryPassenger = `${baseUrl}/${token}/history/customer`;
    return apiCall(listHistoryPassenger);
}
//lich su giao dich
export const fetchListHistoryTransfer = (token) => {
    const listHistoryTransfer = `${baseUrl}/${token}/history/payment`;
    return apiCall(listHistoryTransfer);
}
