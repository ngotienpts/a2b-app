import AppNavigation from './src/navigation/appNavigation';
import registerNNPushToken from 'native-notify';
// import { registerIndieID } from 'native-notify';

export default function App() {
    registerNNPushToken(9548, 'lMdBy39oqOxDJr8zzB1f1L');
    return <AppNavigation />;
}
