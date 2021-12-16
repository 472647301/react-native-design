import React, { PureComponent } from "react";
import { View, Platform } from "react-native";
import { requireNativeComponent } from "react-native";

const RNByronDesign = requireNativeComponent("RNByronDesign");

class AndroidShadowView extends PureComponent {
  render() {
    let cornerRadius = 0;
    let cardElevation = 0;
    if (this.props.style && this.props.style.shadowRadius) {
      cornerRadius = this.props.style.shadowRadius;
    }
    if (this.props.style && this.props.style.shadowOffset) {
      if (this.props.style.shadowOffset.height) {
        cardElevation = this.props.style.shadowOffset.height;
      }
    }
    return (
      <RNByronDesign
        {...this.props}
        cornerRadius={cornerRadius}
        cardElevation={cardElevation}
      >
        {this.props.children}
      </RNByronDesign>
    );
  }
}

const RNShadowView = Platform.OS === "ios" ? View : AndroidShadowView;

export const ShadowView = React.memo((props) => {
  return React.createElement(RNShadowView, props);
});
