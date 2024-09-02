import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

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
