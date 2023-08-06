import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator()
export default function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen}
                    options={{
                      headerShown: false,
                    }}
      />

    </Stack.Navigator>
  )
}