import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="food-bank" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <View className="bg-primary flex justify-center items-center -mt-4 w-16 h-16 rounded-full">
                <Ionicons name="scan" size={28} color="black" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: "Fridge",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="fridge-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
