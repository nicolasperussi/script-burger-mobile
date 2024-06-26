import Button from "@/components/button";
import CartProduct from "@/components/cart-product";
import { useSession } from "@/contexts/authentication";
import { useCart } from "@/contexts/cart";
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

function Cart() {
  const router = useRouter();
  const { items, placeOrder } = useCart();
  const { user, selectedAddress } = useSession();

  return (
    <View className="flex-1 bg-background-secondary px-8 pb-10 gap-8">
      <FlatList
        style={{
          height: 360,
          flexGrow: 1,
        }}
        keyExtractor={(item) => item.product.id.toString()}
        data={items}
        renderItem={({ item, index }) => (
          <CartProduct key={item.product.id} {...item} />
        )}
        ItemSeparatorComponent={() => (
          <View className="my-6 h-[1px] bg-foreground-primary w-full opacity-10" />
        )}
      />
      {selectedAddress ? (
        <Pressable
          onPress={() => router.push("/(app)/address")}
          className="w-full p-8 border border-foreground-secondary rounded-lg flex-row justify-between items-center"
        >
          <View>
            <Text className="text-sm font-regular text-foreground-secondary">
              Entregar em
            </Text>
            <Text className="text-xl font-medium text-foreground-primary">
              {selectedAddress.street}, {selectedAddress.number}
            </Text>
          </View>
          <Icon name="chevron-down" color={colors.tint} size={20} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => router.push("/(app)/address")}
          className="w-full p-8 border border-foreground-secondary rounded-lg flex-row justify-between items-center"
        >
          <Text className="text-xl font-medium text-foreground-primary">
            Adicionar novo endereço
          </Text>
          <Icon name="plus" color={colors.tint} size={20} />
        </Pressable>
      )}
      <Button
        onPress={() => {
          placeOrder(selectedAddress!);
          router.back();
        }}
        text="Finalizar pedido"
      />
    </View>
  );
}

export default Cart;
