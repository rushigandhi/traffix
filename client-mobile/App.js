import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { iOSUIKit } from "react-native-typography";
import { Card } from "./components/Card";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={iOSUIKit.largeTitleEmphasized}>Notifications</Text>
        <Card
          title="Unsafe vehicles"
          description="May instances of tire screeching were reported on January 26, 2020
          near 1280 Main St W."
        />
        <Card
          title="Strong winds"
          description="Strong winds were recorded on January 15, 2020 near 1280 Main St W, be sure to wear appropriate clothing!"
        />
        <Card
          title="Gunshot detected"
          description="Gunshot was detected at approximately 10:00 PM at 901 King St W on the day of January 10, 2020."
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingHorizontal: 20
  }
});
