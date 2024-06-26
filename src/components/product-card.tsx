import { IProduct } from "@/types/product.interface";
import { Link, useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import BRL from "@/utils/BRL";

function ProductCard(props: IProduct) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/(app)/${props.slug}`)}
      className="h-[250px] bg-background-secondary flex-col flex-[50%] rounded-lg overflow-hidden"
    >
      <Image
        style={{ width: "100%", height: "50%" }}
        contentFit="cover"
        source={`http://192.168.0.167:3003/images/${props.slug}.jpg`}
      />
      <View className="p-3 gap-1/2 flex-1">
        <Text
          className="font-medium text-lg text-foreground-primary"
          numberOfLines={1}
        >
          {props.name}
        </Text>
        <Text
          className="text-foreground-primary font-regular text-xs"
          numberOfLines={2}
        >
          {props.overview}
        </Text>
        <Text
          className="font-medium text-xl text-foreground-primary"
          style={{ marginTop: "auto" }}
        >
          {BRL(props.price)}
        </Text>
      </View>
    </Pressable>
  );
}

export default ProductCard;
