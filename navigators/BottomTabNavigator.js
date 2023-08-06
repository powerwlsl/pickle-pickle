
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import SettingsNavigator from "./SettingsNavigator";

const Tab = createBottomTabNavigator()
export default function BottomTabNavigator() {
  return (

    // CCE5E5
    <Tab.Navigator initialRouteName={"Home"} screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'tomato',

      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconColor;
        if (route.name === 'HomeNavigator') {
          iconName = 'map'
          iconColor = focused ? '#9D67FA' : '#d3d3d3';
        } else if (route.name === 'SettingsNavigator') {
          iconName = 'cog'
          iconColor = focused ? '#9D67FA' : '#d3d3d3';
        }
        return <Icon name={iconName} size={20} color={iconColor} />;
      }
    })}>

      <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tab.Screen name="SettingsNavigator" component={SettingsNavigator} options={{
        tabBarLabel: "Settings",
      }} />
    </Tab.Navigator>
  )
}