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

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex flex-1 justify-center items-center bg-secondary/30 gap-6">
        <Card className="h-2/3 overflow-hidden w-1/3 flex justify-center items-center">
          <CardContent className="flex gap-4">
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission}>
              <Text>Grant Permission</Text>
            </Button>
          </CardContent>
        </Card>
        <Separator className="my-4 w-1/3" />
        <View className="flex flex-row justify-between items-center w-1/3">
          <View className="flex-1 flex items-center">
            <Button>
              <Text>Choose an image from gallery</Text>
            </Button>
          </View>
          <Button className="w-10 h-10 rounded-full">
            <AntDesign name="arrowright" size={24} />
          </Button>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View className="flex flex-1 justify-center items-center bg-secondary/30 gap-6">
      <Card className="h-2/3 w-full max-w-lg overflow-hidden flex justify-center">
        <CameraView facing={facing}>
          <View className="flex-1 flex-row bg-transparent m-16">
            <TouchableOpacity
              className="flex-1 self-end items-center"
              onPress={toggleCameraFacing}
            >
              <Text className="text-2xl font-bold text-white">Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </Card>
      <Separator className="my-4 w-full max-w-lg" />
      <View className="px-4 flex flex-row justify-between items-center w-full max-w-lg">
        <View className="flex-1 flex items-center">
          <TouchableOpacity>
            <Button>
              <Text>Choose an image from gallery</Text>
            </Button>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Button className="w-10 h-10 rounded-full">
            <AntDesign name="arrowright" size={24} />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
