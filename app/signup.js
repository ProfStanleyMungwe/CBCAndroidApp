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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import SideMenu from "../components/SideMenu.js";
import { AppContext } from "./_layout.js";
import Checkbox from "expo-checkbox";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import Toast from "react-native-root-toast";
import "expo-dev-client";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
export default function Page() {
  const {
    data,
    setData,
    setMenuOpen,
    menuOpen,
    isConnected,
    setUser,
    setMachineId,
  } = useContext(AppContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [Pwd, setPwd] = useState("");
  const [ShowPwd, setShowPwd] = useState(false);
  const [Wrong, setWrong] = useState(false);
  const [EmailAlreadyInUsed, setEmailAlreadyInUsed] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isChecked, setChecked] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1061604714884-a1p0glnlf8rr3pk35uccdk13n41sjef2.apps.googleusercontent.com",
    iosClientId:
      "1061604714884-7ic645ch76khbm50pkgr3macqa5j7scs.apps.googleusercontent.com",
    webClientId:
      "1061604714884-rjcmojkon1aiqnhgt196a1463ct0srr3.apps.googleusercontent.com",
    expoClientId:
      "1061604714884-vo16ndh5n8h69hr49bpjegssm1fqp7da.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    handleRes();
  }, [response]);
  const handleRes = async () => {
    if (response) await getUserInfo(response.authentication.accessToken);
  };
  const getUserInfo = async (token) => {
    if (!token) {
      return;
    }
    try {
      const resp = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await resp.json();
      console.log(user.email);
      await handleLoginGoolge(user.email);

      navigation.reset({
        index: 0,
        routes: [{ name: "index" }], // your stack screen name
      });
    } catch (e) {
      console.log(e);
      let toast = Toast.show("Failed to Login", {
        duration: Toast.durations.SHORT,
      });
    }
  };
  const handleLoginGoolge = async (emailG) => {
    Keyboard.dismiss();
    setWrong(false);
    let machine_id = await getStoredMachineID();
    try {
      const response = await fetch(
        "https://childbehaviorcheckin.com/back/users/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_id: emailG,
            plan_name: "free",
            machine_id: machine_id,
          }),
        }
      );

      if (!response.ok) {
        let toast = Toast.show("Google Signin Error! Try Again", {
          duration: Toast.durations.SHORT,
        });
      }
      const data = await response.json();
      // console.log(data.success);
      if (data.success != null) {
        let v = await getStoredUserID(data.success.user_data.user_id);
        setUser(data.success.user_data.user_id);
        await AsyncStorage.setItem("login_type", "google");
      } else {
        let toast = Toast.show("Google Signin Error! Try Again", {
          duration: Toast.durations.SHORT,
        });
      }
      // user_data.user_id
    } catch (error) {
      let toast = Toast.show("Google Signin Error! Try Again", {
        duration: Toast.durations.SHORT,
      });
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (Wrong) {
      setWrong(false);
    }
    if (EmailAlreadyInUsed) {
      setEmailAlreadyInUsed(false);
    }
  }, [email, Pwd]);
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    return emailRegex.test(email);
  };
  const handleSignup = async () => {
    Keyboard.dismiss();
    if (!isConnected) {
      let toast = Toast.show("No Internet Connection! Try Again", {
        duration: Toast.durations.SHORT,
      });

      return;
    }
    setLoading(true);
    if (isValidEmail(email) && Pwd != null && Pwd.length >= 3) {
      setWrong(false);
      setEmailAlreadyInUsed(false);

      try {
        const response = await fetch(
          "https://childbehaviorcheckin.com/back/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email_id: email,
              password: Pwd,
              plan_name: "free",
            }),
          }
        );

        if (!response.ok) {
          // setWrong(true);
        }
        const data = await response.json();
        // console.log(data.success);
        if (data.success != null) {
          setLoading(false);
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "signin" }], // your stack screen name
          // });
          let tempLogin = await handleLogin();
          if (tempLogin) {
            navigation.reset({
              index: 0,
              routes: [{ name: "chat" }], // your stack screen name
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "signin" }], // your stack screen name
            });
          }
        } else if (
          data.message.content == "User with this email already exists"
        ) {
          setEmailAlreadyInUsed(true);
          setLoading(false);
        } else {
          setWrong(true);
          setLoading(false);
        }
        // user_data.user_id
      } catch (error) {
        setWrong(true);
        setLoading(false);

        console.error("Error:", error);
      }
    } else {
      setWrong(true);
      setLoading(false);
    }
  };
  const getStoredMachineID = async () => {
    try {
      const value = await AsyncStorage.getItem("machine_id");
      if (value !== null) {
        return value;
      } else {
        let new_id = uuidv4();
        await AsyncStorage.setItem("machine_id", new_id);
        setMachineId(new_id);
        return new_id;
      }
    } catch (e) {
      let new_id = uuidv4();
      await AsyncStorage.setItem("machine_id", new_id);
      setMachineId(new_id);
      console.error("Error:", e);

      return new_id;
    }
  };
  const getStoredUserID = async (user_id) => {
    try {
      await AsyncStorage.setItem("user_id", user_id);
      return true;
    } catch (e) {
      console.error("Error:", e);

      return false;
    }
  };
  const handleLogin = async () => {
    let machine_id = await getStoredMachineID();
    try {
      const response = await fetch(
        "https://childbehaviorcheckin.com/back/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_id: email,
            password: Pwd,
            machine_id: machine_id,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        let toast = Toast.show("Fail to Login", {
          duration: Toast.durations.SHORT,
        });

        return false;
      }
      const data = await response.json();
      if (data.success != null) {
        let v = await getStoredUserID(data.success.user_data.user_id);
        setUser(data.success.user_data.user_id);
        return true;
      } else {
        return false;
      }
      // user_data.user_id
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <SideMenu /> */}
      <View style={styles.headerRow}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => setMenuOpen(true)}>
            {/* <TouchableOpacity onPress={moveRight}> */}

            <Image source={require("../assets/images/icons/menu.png")} style={{width:32, height:32}} />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../assets/images/logo40.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.logoText}>CBC</Text>
        <View style={styles.BetaCon}>
          <Text style={styles.BetaText}>Beta</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            width: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Rubik-Medium",
              textAlign: "center",
              color: "#1B254B",
            }}
          >
            Sign Up
          </Text>

          <TouchableOpacity
            onPress={() => {
              promptAsync();
            }}
            style={{
              backgroundColor: "#f7f7f7",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <Image
              source={require("../assets/images/icons/google.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Rubik-Regular",
                marginLeft: 10,
              }}
            >
              Sign up with Google
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: "43%",
                height: 1,
                backgroundColor: "rgba(135, 140, 189, 0.3)",
              }}
            ></View>

            <Text
              style={{
                fontSize: 13,
                fontFamily: "Rubik-Regular",
                textAlign: "center",
                color: "#A0AEC0",
              }}
            >
              or
            </Text>
            <View
              style={{
                width: "43%",
                height: 1,
                backgroundColor: "rgba(135, 140, 189, 0.3)",
              }}
            ></View>
          </View>
          <View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                  color: "#1B254B",
                }}
              >
                Email*
              </Text>
              <View
                style={{
                  borderColor: Wrong || EmailAlreadyInUsed ? "red" : "#E0E5f2",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <TextInput
                  value={email}
                  onChangeText={(e) => setEmail(e)}
                  placeholder="Enter Email..."
                  placeholderTextColor="#a3aed0"
                  style={{
                    fontSize: 14,
                    fontFamily: "Rubik-Regular",
                    color: "#000",
                  }}
                />
              </View>
              {EmailAlreadyInUsed && (
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Rubik-Regular",
                    color: "red",
                    marginTop: 4,
                  }}
                >
                  User with this email already exists.
                </Text>
              )}
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                  color: "#1B254B",
                }}
              >
                Password*
              </Text>
              <View
                style={{
                  borderColor: Wrong ? "red" : "#E0E5f2",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  value={Pwd}
                  onChangeText={(e) => setPwd(e)}
                  placeholder="Enter Password..."
                  placeholderTextColor="#a3aed0"
                  secureTextEntry={!ShowPwd}
                  style={{
                    fontSize: 14,
                    fontFamily: "Rubik-Regular",
                    color: "#000",
                  }}
                />
                {ShowPwd ? (
                  <TouchableOpacity onPress={() => setShowPwd(false)}>
                    <Image
                      source={require("../assets/images/icons/hideEye.png")}
                      style={{ width: 22, height: 22 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setShowPwd(true)}>
                    <Image
                      source={require("../assets/images/icons/showEye.png")}
                      style={{ width: 22, height: 22 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {Wrong && (
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Rubik-Regular",
                  color: "red",
                  marginTop: 8,
                }}
              >
                Invalid credentials.
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
                style={{
                  height: 16,
                  width: 16,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Rubik-Regular",
                  color: "#1B254B",
                  marginLeft: 7,
                }}
              >
                By creating an account means you agree to our Privacy Policy
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSignup();
              }}
              style={{
                borderRadius: 10,
                padding: 10,
                marginVertical: 15,
                backgroundColor: isChecked ? "#7b3aec" : "#A9A9A9",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={!isChecked || loading}
            >
              {loading ? (
                <Image
                  source={require("../assets/images/icons/loading.gif")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Rubik-Regular",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  Create my account
                </Text>
              )}
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                // marginVertical:15
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                Already a member?
              </Text>
              <Link
                href={"/signin"}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Rubik-Regular",
                    color: "#7b3aec",
                    textAlign: "center",
                  }}
                >
                  Sign in
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C3948",
    height: "100%",
    paddingVertical: 14,
    flex: 1,
    position: "relative",
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
  BetaCon: {
    borderWidth: 1,
    borderColor: "#27AFDE",
    borderRadius: 4,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  BetaText: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#27AFDE",
  },
});
