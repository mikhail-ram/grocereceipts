import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Separator } from "~/components/ui/separator";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Return early if permission is not available (still loading)
  if (!permission) {
    return <View />;
  }

  return (
    <View className="flex flex-1 justify-center items-center bg-secondary/30 gap-6">
      <Card className="h-2/3 w-full max-w-lg overflow-hidden flex justify-center">
        {/* Ternary operator inside the Card component */}
        {permission.granted ? (
          <CameraView facing={facing}>
            <View className="flex-1 flex-row bg-transparent m-16">
              <TouchableOpacity
                className="flex-1 self-end items-center"
                onPress={toggleCameraFacing}
              >
                <Text className="text-2xl font-bold text-white">
                  Flip Camera
                </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          <CardContent className="flex gap-4 items-center">
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission}>
              <Text>Grant Permission</Text>
            </Button>
          </CardContent>
        )}
      </Card>

      <Separator className="my-4 w-full max-w-lg" />

      {/* Footer section */}
      <View className="px-4 flex flex-row justify-between items-center w-full max-w-lg">
        <View className="flex-1 flex items-center">
          <TouchableOpacity>
            <Button>
              <Text>Choose an image from gallery</Text>
            </Button>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Button className="h-10 rounded-full w-full">
            <AntDesign name="arrowright" size={24} />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
