export const searchData = [
    {
        name: 'Nhà riêng',
        address: '286 Nguyễn Xiển, Thanh Trì, Hà Nội',
        coordinates: {
            lat: 20.98354,
            lng: 105.80868,
        },
    },
    {
        name: 'Khu đô thị Royal City',
        address: '72 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        coordinates: {
            lat: 21.0035,
            lng: 105.81575,
        },
    },
    {
        name: 'Cảng hàng không quốc tế Nội Bài',
        address: 'Phú Minh, Sóc Sơn, Hà Nội',
        coordinates: {
            lat: 21.23123,
            lng: 105.81404,
        },
    },
];

export const transportations = [
    {
        id: 1,
        name: 'Xe sedan',
        description: 'Yêu cầu sedan hạng B trở lên, xe sạch sẽ, tài xế lịch sự',
    },
    {
        id: 2,
        name: 'Xe SUV',
        description: 'Yêu cầu xe 7 chỗ rộng rãi',
    },
    {
        id: 3,
        name: 'Xe khách',
        description: 'Xe 16 chỗ đi tỉnh',
    },
];

export const currentPosition = {
    address: 'Xã Tân Triều, Huyện Thanh Trì, Hà Nội',
    coordinates: {
        lat: 20.98382,
        lng: 105.80779,
    },
    name: 'Ngõ 286 Nguyễn Xiển',
};

export const listDrivers = [
    {
        id: 0,
        image_driver: 'https://i.pinimg.com/236x/3b/a6/8d/3ba68dd05183a0233ea98974dd05a4d4.jpg',
        image_car: 'https://i.pinimg.com/236x/a2/35/3b/a2353b49029f0fade276cb0d8cea1f75.jpg',
        name_driver: 'Nguyễn Văn A',
        protected: true,
        name_car: 'Ferani',
        model: '2022',
        wifi: true,
        water: true,
        star: '3.0',
        bill: '500.000',
        license_plate: '29H-12345',
    },
    {
        id: 3,
        image_driver: 'https://i.pinimg.com/236x/8b/65/cf/8b65cfd21e7aed358a73b48ca5a7f3c2.jpg',
        image_car: 'https://i.pinimg.com/236x/fb/74/7f/fb747fe9878196d267c76d7b666bf5aa.jpg',
        name_driver: 'Nguyễn Văn B',
        protected: false,
        name_car: 'BMW X7',
        model: '2023',
        wifi: true,
        water: false,
        star: '4.0',
        bill: '400.000',
        license_plate: '29C-54321',
    },
];

export const reviewTextComplete = [
    {
        id: 1,
        name: 'Dịch vụ tốt',
    },
    {
        id: 2,
        name: 'Tài xế nhiệt tình',
    },
    {
        id: 3,
        name: 'Tốt',
    },
];

export const notifications = [
    {
        notify_id: '43',
        user_id: '3',
        content: 'Trừ 8k (3%) phí nền tảng của chuyến đi #22',
        status: '1',
        created_at: '2023-05-26 14:10:43',
        screen: 'TransactionScreen',
        telegram: '5536223873',
        is_telegram: '1',
    },
    {
        notify_id: '37',
        user_id: '3',
        content: 'Khách đã xác nhận đặt chuyến của bạn',
        status: '0',
        created_at: '2023-05-24 11:00:37',
        screen: 'ConfirmScreen',
        telegram: '5536223873',
        is_telegram: '1',
    },
    {
        notify_id: '21',
        user_id: '3',
        content:
            'Bạn đã được đánh giá 3 sao bởi tài xế Nguyễn Ngọc Lâm trong chuyến đi #6. Nội dung đánh giá: chán',
        status: '1',
        created_at: '2023-05-15 15:09:35',
        screen: 'CompleteScreen',
        telegram: '5536223873',
        is_telegram: '1',
    },
];
