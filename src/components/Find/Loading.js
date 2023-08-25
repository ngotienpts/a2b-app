import { View, Text, TouchableOpacity } from "react-native";
import { ArrowUturnRightIcon, ChevronDoubleDownIcon, MapPinIcon, StopCircleIcon } from "react-native-heroicons/solid";
import Skenleton from "../skeleton/Skenleton";
import styles from "../../styles";
import { waiting } from "../../constants";
import { Dimensions } from "react-native";

const Loading = () => {
    const cardWidth = Dimensions.get("window").width * 0.8;

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#000",
        }}>
            <View style={[styles.card, styles.pt15, {
                backgroundColor: '#000'
            }]}>
                <View style={[styles.flexBetween, styles.mb24]}>
                    <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                        Bạn đang đặt chuyến
                    </Text>
                    <Text style={[styles.fs14, styles.textGray77]}>
                        #
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <StopCircleIcon
                        size={20}
                        color={'#777D92'}
                        style={{ marginTop: 10, marginRight: 10 }}
                    />
                    <Skenleton height={16} width={cardWidth - 170} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                </View>
                <View>
                    <Skenleton height={16} width={cardWidth - 30} style={{ marginTop: 10, marginLeft: 30, alignItems: 'flex-end' }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <MapPinIcon
                        size={20}
                        color={'#777D92'}
                        style={{ marginTop: 10, marginRight: 10 }}
                    />
                    <Skenleton height={16} width={cardWidth - 170} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                </View>
                <View>
                    <Skenleton height={16} width={cardWidth - 30} style={{ marginTop: 10, marginLeft: 30, marginBottom: 30, alignItems: 'flex-end' }} />
                </View>
                <TouchableOpacity style={[styles.flexCenter, styles.mb24]}>
                    <ChevronDoubleDownIcon size={20} color={'white'} />
                    <Text style={[styles.textWhite]}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <View
                style={[
                    styles.mb24,
                    styles.py15,
                    styles.border1,
                    styles.borderTop,
                    styles.borderBot,
                    styles.flexRow,
                ]}
            >
                <View
                    style={[
                        styles.flexFull,
                        styles.justifyBetween,
                        styles.itemsCenter,
                        styles.borderRight,
                        styles.borderSolid,
                    ]}
                >
                    <Text
                        style={[
                            styles.fs16,
                            styles.textGray77,
                            styles.lh24,
                            styles.textCenter,
                        ]}
                    >
                        Quãng đường
                    </Text>
                    <Skenleton height={42} width={cardWidth - 258} />
                </View>
                <View
                    style={[
                        styles.flexFull,
                        styles.justifyBetween,
                        styles.itemsCenter,
                        styles.borderRight,
                        styles.borderSolid,
                    ]}
                >
                    <Text
                        style={[
                            styles.fs16,
                            styles.textGray77,
                            styles.lh24,
                            styles.textCenter,
                        ]}
                    >
                        Thời gian
                    </Text>
                    <Skenleton height={42} width={cardWidth - 258} />
                </View>
                <View style={[styles.flexFull, styles.justifyBetween, styles.itemsCenter]}>
                    <Text
                        style={[
                            styles.fs16,
                            styles.textGray77,
                            styles.lh24,
                            styles.textCenter,
                        ]}
                    >
                        Google map
                    </Text>
                    <View
                        style={[
                            styles.flexCenter,
                            styles.bgGray161,
                            styles.mt20,
                            { width: 73, height: 42 },
                        ]}
                    >
                        <ArrowUturnRightIcon size={25} color={'white'} />
                    </View>
                </View>
            </View>

            <View>
                <View style={[styles.flexBetween, styles.mb10, styles.px15]}>
                    <Text
                        style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}
                    >
                        Chọn tài xế
                    </Text>
                    <Text style={[styles.fs13, styles.textGray77]}>Sắp xếp</Text>
                </View>
                <Text style={[styles.fs16, styles.textGray77, styles.mb20, styles.px15]}>
                    Chuyến đi của bạn sẽ được tìm tài xế trước khi khởi hành 120 phút. Dưới
                    đây là danh sách các tài xế tham khảo ở thời điểm hiện tại:
                </Text>
                {waiting.map((val) => (
                    <View key={val?.id} style={[styles.card, { width: cardWidth + 80, marginBottom: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <Skenleton height={75} width={cardWidth - 198} style={{ marginRight: 10, alignItems: 'flex-end' }} />
                            <View>
                                <Skenleton height={16} width={cardWidth - 145} style={{ marginTop: 4, alignItems: 'flex-end' }} />
                                <Skenleton height={16} width={cardWidth - 145} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                                <Skenleton height={16} width={cardWidth - 145} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}
export default Loading;