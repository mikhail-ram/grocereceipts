import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "~/lib/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
type RecipeListScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function RecipeListScreen({
  navigation,
}: RecipeListScreenProps) {
  const tabBarHeight = useBottomTabBarHeight();
  const recipeImage = require("~/assets/images/recipe-image.png");

  return (
    <ScrollView className="flex-1 p-6">
      <View
        className="mb-6 items-center"
        style={{ marginBottom: tabBarHeight / 2 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate("Details", { recipeId: i })}
          >
            <Card
              key={i}
              className="mb-6 flex flex-row justify-stretch rounded-2xl"
            >
              <View className="flex-column flex justify-center">
                <Image
                  source={recipeImage}
                  style={{ width: 150, height: 150 }}
                  className="rounded-l-2xl"
                />
              </View>
              <View>
                <CardHeader>
                  <CardTitle className="text-lg">Recipe {i}</CardTitle>
                  <CardDescription>1 hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    Recipe {i} description...
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
