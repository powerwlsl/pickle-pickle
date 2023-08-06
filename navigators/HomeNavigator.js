import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import FormScreen from "../screens/FormScreen";

const Stack = createNativeStackNavigator()
export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Form" component={FormScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}