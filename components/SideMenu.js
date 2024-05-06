import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { AppContext } from "../app/_layout.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

export default function SideMenu() {
  const router = useRouter();
  const navigation = useNavigation();

  const { menuOpen, setMenuOpen, user, setUser } = useContext(AppContext);
  const position = useRef(new Animated.ValueXY({ x: -360, y: 0 })).current;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [height, setHeight] = useState(100);
  useEffect(() => {
    const { height: screenHeight } = Dimensions.get("window");
    // Subtract 20% from the screen height
    StatusBar.currentHeight && setStatusBarHeight(StatusBar.currentHeight);
    
      setHeight(screenHeight);
  }, []);
  const SignMeOut = async () => {
    try {
      await AsyncStorage.removeItem("user_id", null);
      setUser(null);
      setMenuOpen(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "index" }], // your stack screen name
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  useEffect(() => {
    if (menuOpen) {
      moveRight();
    }
    if (!menuOpen) {
      // Animated.timing(position, {
      //   toValue: { x: -360, y: 0 },
      //   duration: 1000,
      //   useNativeDriver: false,
      // }).start();
    }
  }, [menuOpen]);
  const moveRight = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const moveLeft = (to) => {
    Animated.timing(position, {
      toValue: { x: -360, y: 0 },
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setMenuOpen(false);
    });
  };
  return (
    <View
      style={[
        styles.mainbox,
        {
          marginTop: statusBarHeight,
          height: height,
          display: menuOpen ? "flex" : "none",
        },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => {
          moveLeft();
        }}
      />
      <Animated.View
        style={[
          styles.box,
          {
            transform: position.getTranslateTransform(),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => moveLeft()}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            top: 15,
            right: 15,
          }}
        >
          <Image source={require("../assets/images/icons/close.png")} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 50,
            marginLeft: 24,
          }}
        >
          <Image
            source={require("../assets/images/logo40.png")}
            style={{ width: 64, height: 64 }}
          />

          <Text
            style={{
              fontSize: 46,
              fontFamily: "Rubik-Medium",
              color: "#000",
              marginLeft: 10,
            }}
          >
            CBC
          </Text>
        </View>
        {user == null ? (
          <View
            style={{ position: "absolute", bottom: 30, left: 24, width: "80%" }}
          >
            <TouchableOpacity
              onPress={() => {
                moveLeft();
                router.push("/chat");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                width: "100%",
              }}
            >
              <Image
                source={require("../assets/images/icons/chat.png")}
                style={{ width: 24, height: 24 }}
              />

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik-Regular",
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                moveLeft();
                router.push("/signin");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                width: "100%",
              }}
            >
              <Image
                source={require("../assets/images/icons/signin.png")}
                style={{ width: 24, height: 24 }}
              />

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik-Regular",
                  color: "#000",
                  marginLeft: 10,
                  width: "100%",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                moveLeft();
                router.push("/signup");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={require("../assets/images/icons/signin.png")}
                style={{ width: 24, height: 24 }}
              />

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik-Regular",
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{ position: "absolute", bottom: 30, left: 24, width: "80%" }}
          >
            <TouchableOpacity
              onPress={() => {
                moveLeft();
                router.push("/chat");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                width: "100%",
              }}
            >
              <Image
                source={require("../assets/images/icons/chat.png")}
                style={{ width: 24, height: 24 }}
              />

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik-Regular",
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SignMeOut()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                width: "100%",
              }}
            >
              <Image
                source={require("../assets/images/icons/signin.png")}
                style={{ width: 24, height: 24 }}
              />

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Rubik-Regular",
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbox: {
    width: "100%",

    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    zIndex: 10000000,
  },
  box: {
    width: "80%",
    maxWidth: 340,
    flex: 1,
    // height: "106%",
    height: "100%",

    backgroundColor: "#e1f4f9",
    borderTopRightRadius: 15,
    position: "absolute",
    top: 0,
    // position: "absolute",
    // top: 0,
    // zIndex: 10000000,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuBar: { marginHorizontal: 24 },
  logoText: {
    fontSize: 24,
    fontFamily: "Rubik-SemiBold",
    color: "#fff",
    marginHorizontal: 6,
  },
});
