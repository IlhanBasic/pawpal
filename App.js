import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Home from "./screens/HomeScreen";
import List from "./screens/ListScreen";
import Favorites from "./screens/FavoritesScreen";
import DogsContextProvider from "./store/context/dogs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DogScreen from "./screens/DogScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import FavoritesContextProvider from "./store/context/favorites";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Map from "./screens/Map";
import AuthContextProvider from "./store/context/auth";
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import COLORS from "./constants/colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { navigationRef } from "./navigation/RootNavigation"; // prilagodi putanju
import LocationContextProvider from "./store/context/location";
function TabsNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "AllList") {
            return <FontAwesome6 name="list-ul" size={size} color={color} />;
          } else if (route.name === "Favorites") {
            return <Ionicons name="heart" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.border,
          height: 65,
          paddingBottom: 8,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 4,
          elevation: 4,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      })}
    >
      <BottomTab.Screen
        name="AllList"
        component={List}
        options={{
          title: "All Dogs",
          tabBarBadgeStyle: { backgroundColor: "tomato" },
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          tabBarBadgeStyle: { backgroundColor: "tomato" },
        }}
      />
    </BottomTab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      initialParams={{
        selectedLatitude: null,
        selectedLongitude: null,
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.light,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 22,
        },
        drawerStyle: {
          backgroundColor: COLORS.secondary,
          width: 260,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textLight,
        drawerLabelStyle: {
          fontSize: 17,
          fontWeight: "500",
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="List"
        component={TabsNavigator}
        options={{
          title: "Dog List",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="paw" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LocationContextProvider>
          <AuthContextProvider>
            <FavoritesContextProvider>
              <DogsContextProvider>
                <NavigationContainer ref={navigationRef}>
                  <Stack.Navigator
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: COLORS.primary,
                        elevation: 0,
                        shadowOpacity: 0,
                      },
                      headerTintColor: COLORS.light,
                      headerTitleStyle: {
                        fontWeight: "700",
                        fontSize: 20,
                        letterSpacing: 0.5,
                      },
                      headerBackTitleVisible: false,
                    }}
                  >
                    <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{ headerShown: false }}
                    />

                    <Stack.Screen
                      name="SignUp"
                      component={SignUp}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Map"
                      component={Map}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Menu"
                      component={DrawerNavigator}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Details"
                      component={DogScreen}
                      options={({ route }) => ({
                        title: route.params?.dogName || "Dog Details",
                      })}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </DogsContextProvider>
            </FavoritesContextProvider>
          </AuthContextProvider>
        </LocationContextProvider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
