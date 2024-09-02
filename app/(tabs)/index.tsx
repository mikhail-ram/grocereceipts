import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "~/lib/types";
import RecipeDetailsScreen from "~/components/RecipeDetailsScreen";
import RecipeListScreen from "~/components/RecipeListScreen";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={RecipeListScreen} />
      <HomeStack.Screen name="Details" component={RecipeDetailsScreen} />
    </HomeStack.Navigator>
  );
}
