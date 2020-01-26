import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Card as CardContainer } from "react-native-shadow-cards";
import { iOSUIKit } from "react-native-typography";

export class Card extends React.Component {
  render() {
    return (
      <CardContainer style={styles.container}>
        <Text style={iOSUIKit.bodyEmphasized}>{this.props.title}</Text>
        <Text style={iOSUIKit.callout}>{this.props.description}</Text>
      </CardContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 15
  }
});
