import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";
export default function LoginRequiredModal({ showModal, onClose }) {
  const router = useRouter();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        onClose();
      }}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => {
          onClose();
        }}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Rubik-Regular",
              textAlign: "center",
              marginBottom: 8,
              // width:"100%",
            }}
          >
            You have reached your 3 free messages limit.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Rubik-Regular",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {" "}
            Please sign in to get more.
          </Text>
          {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() =>  onClose()}
          >
            <Text style={styles.textStyle}>Dismiss</Text>
          </Pressable> */}
          <TouchableOpacity
            onPress={() => {onClose();router.push("/signin");}}
            style={{
              borderRadius: 10,
              padding: 10,
              marginTop: 15,
              backgroundColor: "#7b3aec",
              width: "100%",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Rubik-Regular",
                color: "#fff",
                textAlign: "center",
                width: "100%",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: "40%",
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
                width: "40%",
                height: 1,
                backgroundColor: "rgba(135, 140, 189, 0.3)",
              }}
            ></View>
          </View>
          <TouchableOpacity
            onPress={() => {onClose();router.push("/signup");}}
            style={{
              borderRadius: 10,
              padding: 10,
              marginBottom: 15,
              backgroundColor: "#7b3aec",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Rubik-Regular",
                color: "#fff",
                textAlign: "center",
                width: "100%",
              }}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: '80%',
    // maxWidth: 350,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
