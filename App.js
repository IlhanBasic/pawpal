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
import AuthContextProvider from "./store/context/auth";
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function TabsNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "AllList") {
            iconName = "list-ul";
            return <FontAwesome6 name={iconName} size={size} color={color} />;
          } else if (route.name === "Favorites") {
            iconName = "heart";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
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
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: "#f8f8f8",
          width: 240,
        },
        drawerActiveTintColor: "tomato",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
          marginLeft: -15,
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
      <StatusBar style="light" />
      <AuthContextProvider>
        <FavoritesContextProvider>
          <DogsContextProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "tomato",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
