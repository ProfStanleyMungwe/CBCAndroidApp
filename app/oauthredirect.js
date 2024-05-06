import React, { useState, useRef, useContext, useEffect } from "react";
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
import HistroyLoading from "../components/HistroyLoading.js";

export default function Page() {
  const [showHistroyLoadingModal, setShowHistroyLoadingModal] = useState(true);

  return (
    <View style={{position:"relative"}}>
     <HistroyLoading
        showModal={showHistroyLoadingModal}
        onClose={() => setShowHistroyLoadingModal(false)}
      />
    </View>
  );
}
