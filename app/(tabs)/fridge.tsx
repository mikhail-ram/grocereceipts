import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { FridgeStackParamList } from "~/lib/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type FridgeListScreenProps = NativeStackScreenProps<
  FridgeStackParamList,
  "Fridge"
>;
const FridgeStack = createNativeStackNavigator<FridgeStackParamList>();

function FridgeListScreen({ navigation }: FridgeListScreenProps) {
  const tabBarHeight = useBottomTabBarHeight();
  const itemImage = require("~/assets/images/item-image.png");

  return (
    <ScrollView className="flex-1 p-6">
      <View
        className="mb-6 items-center"
        style={{ marginBottom: tabBarHeight / 2 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate("Details", { itemId: i })}
          >
            <Card
              key={i}
              className="max-w-xl w-full mb-6 flex flex-row justify-stretch rounded-2xl"
            >
              <Image
                source={itemImage}
                style={{ width: 150, height: "100%" }}
                className="rounded-l-2xl"
                resizeMode="cover"
              />
              <View className="flex-1">
                <CardHeader>
                  <CardTitle className="text-lg">Item {i}</CardTitle>
                  <CardDescription>Expires 17/09/24</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Text className="text-muted-foreground text-sm">
                    Food item {i} description (calories, nutrition breakdown...)
                  </Text>
                </CardContent>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

type FridgeDetailsScreenProps = NativeStackScreenProps<
  FridgeStackParamList,
  "Details"
>;

function FridgeDetailsScreen({ route, navigation }: FridgeDetailsScreenProps) {
  const { itemId } = route.params;

  const itemImage = require("~/assets/images/item-image.png");

  return (
    <ScrollView className="p-6" contentContainerStyle={{ paddingBottom: 48 }}>
      <View className="max-w-xl w-full mx-auto">
        <Image
          source={itemImage}
          className="bg-cover rounded-lg mb-3"
          style={{ width: "100%", height: 300 }}
        />
        <Text className="text-3xl font-bold">Item {itemId}</Text>
      </View>
    </ScrollView>
  );
}

export default function FridgeStackScreen() {
  return (
    <FridgeStack.Navigator>
      <FridgeStack.Screen name="Fridge" component={FridgeListScreen} />
      <FridgeStack.Screen name="Details" component={FridgeDetailsScreen} />
    </FridgeStack.Navigator>
  );
}
