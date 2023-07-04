import { Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';

const ios = Platform.OS == 'ios';

const LoginBtn = () => {
  const navigation = useNavigation();

  const androidClientId = '187142393375-7bp1qk9479dibdaepdpj3ibeotm4pr3p.apps.googleusercontent.com';
  const webClientId = '187142393375-c2ai5ek3ap50qat3i710ucc9mirv4j2b.apps.googleusercontent.com';
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
    if (response?.type === 'success') {
      // Xử lý thành công
      getUserInfo(response.authentication.accessToken)
    } else {
      // Xử lý không thành công hoặc hủy bỏ
      console.log('Đăng nhập Google không thành công hoặc đã hủy bỏ.');
    }
  }, [response]) //truyen [] de goi useEffect 1 lan sau khi compoment mounted

  const handleGoogleLogin = async () => {
    // Thực hiện các hành động mong muốn ở đây
    await promptAsync();
  }

  const handleAppleLogin = async () => {
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
      console.log(user);
      await login(user);
    } catch (err) {

    }
  }

  const login = async (user) => {
    const url = 'https://api.beta-a2b.work/login?email=' + encodeURIComponent(user.email) + '&fullname=' + encodeURIComponent(user.name) + '&picture=' + encodeURIComponent(user.picture) + '&123';
    const responseUrl = await fetch(url);
    const result = await responseUrl.json();
    // console.log(1);
    if (result.res == 'success') {
      console.log(result.token);
      navigation.navigate('Home',{
        token: result.token,
      });
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
