import { Image, View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "~/lib/types";
import { Badge } from "~/components/ui/badge";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { cssInterop } from "nativewind";

type RecipeDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;

const iconLibraries = [AntDesign, Feather, MaterialCommunityIcons];
iconLibraries.forEach((iconLibrary) => {
  cssInterop(iconLibrary, { className: "style" });
});

export default function RecipeDetailsScreen({
  route,
  navigation,
}: RecipeDetailsScreenProps) {
  const { recipeId } = route.params;

  const recipe = {
    name: "Spicy Thai Basil Chicken",
    prepTime: "30 minutes",
    servings: 4,
    flavorProfile: ["Spicy", "Savory"],
    description:
      "A quick and flavorful Thai dish that combines tender chicken with fragrant basil and chili. Perfect for a weeknight dinner that packs a punch!",
    ingredients: [
      "1 lb boneless, skinless chicken thighs, cut into bite-sized pieces",
      "4 cloves garlic, minced",
      "2-3 Thai bird's eye chilies, finely chopped",
      "1 cup Thai basil leaves",
      "2 tbsp vegetable oil",
      "2 tbsp oyster sauce",
      "1 tbsp soy sauce",
      "1 tsp fish sauce",
      "1 tsp sugar",
      "1/4 cup chicken broth",
    ],
    instructions: [
      "Heat oil in a wok or large skillet over high heat.",
      "Add minced garlic and chilies, stir-fry for 30 seconds until fragrant.",
      "Add chicken pieces and stir-fry for 3-4 minutes until they start to brown.",
      "Add oyster sauce, soy sauce, fish sauce, and sugar. Stir to combine.",
      "Pour in chicken broth and simmer for 2-3 minutes until chicken is cooked through.",
      "Toss in Thai basil leaves and stir until wilted.",
      "Serve hot with steamed jasmine rice.",
    ],
  };
  const recipeImage = require("~/assets/images/recipe-image.png");

  return (
    <ScrollView className="p-6" contentContainerStyle={{ paddingBottom: 48 }}>
      <View className="max-w-xl w-full mx-auto">
        <Image
          source={recipeImage}
          className="bg-cover rounded-lg mb-3"
          style={{ width: "100%", height: 300 }}
        />
        <Text className="text-3xl font-bold">{recipe.name}</Text>
        <Text className="text-lg mt-2">{recipe.description}</Text>
        <View>
          <View className="my-4 flex flex-row flex-wrap justify-between mb-6 gap-3">
            <View className="flex flex-row items-center gap-2">
              <AntDesign
                name="clockcircleo"
                className="text-muted-foreground"
              />
              <Text>{recipe.prepTime}</Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Feather name="users" className="text-muted-foreground" />
              <Text>Serves {recipe.servings}</Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                className="text-muted-foreground"
              />
              {recipe.flavorProfile.map((flavor, index) => (
                <Badge key={index} variant="secondary" className="flex-none">
                  <Text>{flavor}</Text>
                </Badge>
              ))}
            </View>
          </View>
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-2">Ingredients</Text>
            <View className="pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <Text key={index}>• {ingredient}</Text>
              ))}
            </View>
          </View>
          <View>
            <Text className="text-xl font-semibold mb-2">Instructions</Text>
            <View className="pl-5 space-y-2">
              {recipe.instructions.map((step, index) => (
                <Text key={index}>
                  {index + 1}. {step}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
