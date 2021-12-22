import React, { PureComponent } from "react";
import { View, Platform } from "react-native";
import { requireNativeComponent } from "react-native";

const RNByronCardView = requireNativeComponent("RNByronCardView");

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
      <RNByronCardView
        {...this.props}
        cornerRadius={cornerRadius}
        cardElevation={cardElevation}
      >
        {this.props.children}
      </RNByronCardView>
    );
  }
}

const RNShadowView = Platform.OS === "ios" ? View : AndroidShadowView;

export const ShadowView = React.memo((props) => {
  return React.createElement(RNShadowView, props);
});
