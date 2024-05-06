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
import { AppContext } from "./_layout.js";
import SideMenu from "../components/SideMenu.js";
export default function Page() {
  const { data, setData, setMenuOpen, menuOpen } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* <SideMenu /> */}
      <View style={styles.headerRow}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => setMenuOpen(true)}>
            {/* <TouchableOpacity onPress={moveRight}> */}

            <Image source={require("../assets/images/icons/menu.png")}  style={{width:32, height:32}}/>
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
      <View style={styles.imgInfoCon}>
        <Image
          source={require("../assets/images/child.png")}
          style={styles.child}
        />
        <View style={styles.sampleMsgCon}>
          <View style={styles.sampleMsgConCon}>
            <Image
              source={require("../assets/images/women.png")}
              style={styles.sampleMsgImg}
            />
            <Text style={styles.sampleMsgTxt}>
              What are some effective methods of disciplining a child who
              refuses to listen and cries instead of following directions?
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsCon}>
        <Text style={styles.mainDetail}>CBC</Text>
        <Text style={styles.submainDetail}>Child Behavior Check-in</Text>
        <Text style={styles.textDetail}>
          Collaborate with CBC to offer guidance and support for a variety of
          behavioral needs.
        </Text>
      </View>

      <View style={styles.BtmBtnCon}>
        <Link href="/chat" asChild>
          <TouchableOpacity onPress={() => {}} style={styles.BtmBtn}>
            <Text style={styles.buttonText}>Talk to me</Text>
          </TouchableOpacity>
        </Link>
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
  box: {
    width: "80%",
    maxWidth: 340,
    flex: 1,
    height: "106%",
    backgroundColor: "#e1f4f9",
    borderTopRightRadius: 15,
    position: "absolute",
    top: 0,
    zIndex: 10000000,
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
  imgInfoCon: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 30,
    maxHeight: 300,
    position: "relative",
  },
  child: {
    borderRadius: 24,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  sampleMsgCon: {
    position: "absolute",
    bottom: -30,
    // left:0,
    right: "-5%",
    flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "120%",
  },
  sampleMsgConCon: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    width: "78%",
  },
  sampleMsgImg: {
    width: 51,
    height: 51,
  },
  sampleMsgTxt: {
    width: "78%",
    marginLeft: 12,
    fontSize: 13,
    fontFamily: "Rubik-Regular",
  },
  detailsCon: {
    paddingHorizontal: 24,
    marginTop: 50,
  },
  mainDetail: {
    fontSize: 64,
    lineHeight: 64,
    fontFamily: "Rubik-Bold",
    color: "#fff",
    margin: 0,
    padding: 0,
  },
  submainDetail: {
    fontSize: 17,
    fontFamily: "Rubik-Medium",
    color: "#fff",
  },
  textDetail: {
    fontSize: 15,
    fontFamily: "Rubik-Regular",
    color: "#fff",
    maxWidth: "70%",
  },
  BtmBtnCon: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: 20,
  },
  BtmBtn: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#27AFDE",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
});
