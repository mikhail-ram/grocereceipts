import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ScanButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

function ScanButton({ children, onPress }: ScanButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary flex justify-center items-center -mt-4 w-16 h-16 rounded-full"
    >
      {children}
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
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
          tabBarIcon: () => <Ionicons name="scan" size={24} color="black" />,
          tabBarButton: (props) => <ScanButton {...props} />,
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
