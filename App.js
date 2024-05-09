import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import AppProvider from "./src/hooks";

import Home from "./src/containers/Home";

export default function App() {
  const CustomStatusBar = ({ backgroundColor, barStyle = "light-content" }) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
        />
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <AppProvider>
        <CustomStatusBar backgroundColor="#000" />
        <Home />
      </AppProvider>
    </SafeAreaProvider>
  );
}

