import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import * as Location from 'expo-location';
import { PermissionsAndroid } from 'react-native';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';

const LoginBtn = () => {
  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';

  const androidClientId = '187142393375-7bp1qk9479dibdaepdpj3ibeotm4pr3p.apps.googleusercontent.com';
  const webClientId = '187142393375-c2ai5ek3ap50qat3i710ucc9mirv4j2b.apps.googleusercontent.com';
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClientId,
    webClientId: webClientId,
    expoClientId: webClientId
  });

  // Hành động được thực hiện sau khi component được render hoặc state thay đổi
  // Có thể là các hành động bất đồng bộ như gọi API
  // Đảm bảo rằng hành động không gây ra vòng lặp vô hạn
  // Trả về một hàm cleanup (nếu cần) để xử lý khi component unmount hoặc state thay đổi
  useEffect(() => {
    if (latitude === '' && longitude === '') {
      requestLocationService();
    }
    if (response?.type === 'success') {
      //   // Xử lý thành công
      getUserInfo(response.authentication.accessToken)
    } else {
      // Xử lý không thành công hoặc hủy bỏ
      console.log('Đăng nhập Google không thành công hoặc đã hủy bỏ.');
    }
  }, [response]) //truyen [] de goi useEffect 1 lan sau khi compoment mounted

  const requestLocationService = async () => {
    try {
      if (Platform.OS == 'android') {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Bật định vị',
          message: 'Chúng tôi có thể bật định vị không?',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Đồng ý',
        })
        if (result === 'granted') {
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
        await getLocation();
      } else if (Platform.OS == 'macos' || Platform.OS == 'ios') {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }else{
          console.log('Success GPS');
        }
        await getLocation(); 
      }
    } catch (error) {
      return false;
    }
  }

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude); 
  }

  const handleGoogleLogin = async () => {
    // Thực hiện các hành động mong muốn ở đây
    await promptAsync();
  }

  const handleAppleLogin = async () => {
    // console.log(uuid());
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });
      // console.log('Apple login credential:', credential);
      const user = jwtDecode(credential.identityToken);
      user.name = user.email.split('@')[0];
      user.picture = '';
      await login(user);
    } catch (e) { 
      console.log(e);
    }
  }

  const getUserInfo = async (token) => {
    try {
      const request = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        });
      const user = await request.json();
      await login(user);
    } catch (err) {

    }
  }

  const login = async (user) => {
    if(!isNaN(latitude) && !isNaN(longitude)){
      const url = 'https://api.beta-a2b.work/login?email=' + encodeURIComponent(user.email) + '&fullname=' + encodeURIComponent(user.name) + '&picture=' + encodeURIComponent(user.picture) + '&123';
      const responseUrl = await fetch(url);
      const result = await responseUrl.json();
      if (result.res == 'success') {
        console.log(latitude);
        console.log(longitude);
        navigation.navigate('Home', {
          token: result.token,
          lat: latitude,
          lng: longitude
        });
      }
    }else{
      alert('Hãy chờ ứng dụng bật định vị cho bạn!')
    }
  }

  return (
    <View style={styles.mt60}>
      <TouchableOpacity onPress={() => handleGoogleLogin()}>
        <View style={[styles.bgRed, styles.flexCenter, styles.w250, styles.h48, styles.border4]}>
          <Icon name={'google'} style={[styles.textWhite, styles.fs28, styles.mr10]} />
          <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Google</Text>
        </View>
      </TouchableOpacity>
      {ios ? (
        <TouchableOpacity onPress={() => handleAppleLogin()}>
          <View
            style={[
              styles.bgGray,
              styles.flexCenter,
              styles.w250,
              styles.h48,
              styles.border4,
              styles.mt20,
            ]}
          >
            <Icon name={'apple'} style={[styles.textWhite, styles.fs28, styles.mr10]} />
            <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Apple</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default LoginBtn;
