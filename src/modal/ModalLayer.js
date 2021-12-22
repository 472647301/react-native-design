import React from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback, View, } from 'react-native';
import ModalLayerAnimated from './ModalLayerAnimated';
const screenSize = Dimensions.get('window');
export default class ModalLayer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isShow: false,
            showAnimated: new Animated.Value(0),
            transform: [],
            boxStyle: {},
            contentComponent: null,
        };
        this.isAction = false;
        this.boxStyle = {};
        this.transform = [];
        this.__isMounted = true;
        this._subscriptions = [];
        this.keyboardIsShow = false;
        this.keyboardDidShowHandle = () => {
            this.keyboardIsShow = true;
        };
        this.keyboardDidHideHandle = () => {
            this.keyboardIsShow = false;
        };
    }
    componentDidMount() {
        this._subscriptions = [
            Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandle),
            Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandle),
        ];
    }
    componentWillUnmount() {
        this._subscriptions.forEach(subscription => {
            subscription.remove();
        });
        this.__isMounted = false;
    }
    toggle(isShow) {
        return new Promise((resolve, reject) => {
            Animated.timing(this.state.showAnimated, {
                toValue: isShow ? 100 : 0,
                easing: isShow ? this.showEasing : this.hideEasing,
                useNativeDriver: true,
                duration: isShow ? this.showDuration : this.hideDuration,
            }).start(() => {
                resolve();
            });
        });
    }
    render() {
        const state = this.state;
        const { shadePress, shade = true } = this.props;
        const opacity = state.showAnimated.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
        });
        const {zIndex = 0, elevation = 0} = this.boxStyle || {}
        return (<View style={[styles.view, { left: state.isShow ? 0 : 9999, zIndex, elevation }]}>
        <View style={styles.container}>
          {shade ? (<TouchableWithoutFeedback onPress={shadePress || (() => (this.keyboardIsShow ? Keyboard.dismiss() : this.mlc.hide()))}>
              <Animated.View style={[styles.fixedBg, this.boxStyle, { opacity: opacity }]}/>
            </TouchableWithoutFeedback>) : null}
          <Animated.View style={[styles.box, this.boxStyle, { transform: this.transform, opacity: opacity }]}>
            {this.contentComponent}
          </Animated.View>
        </View>
      </View>);
    }
    preload(component, callback) {
        if (!this.contentComponent) {
            this.contentComponent = component;
            this.setState({}, callback);
        }
    }
    show(options = { component: null, boxStyle: {}, act: ModalLayerAnimated.SCALE }) {
        this.contentComponent = options.component;
        this.boxStyle = options.boxStyle;
        this.transform = options.act(this.state.showAnimated);
        // this.setState({
        //   contentComponent: options.component,
        //   boxStyle: options.boxStyle,
        //   transform: ModalLayerAnimated.getAnimated(this.state.showAnimated, options.act)
        // });
        return new Promise((resolve, reject) => {
            this.setState({
                isShow: true,
            }, () => this.toggle(true).then(resolve));
        });
    }
    hide() {
        return this.toggle(false).then(() => {
            this.setState({
                isShow: false,
            });
        });
        // return new Promise((resolve, reject) => {
        //
        // });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'absolute',
        // width: screenSize.width,
        // height: screenSize.height,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        position: 'absolute',
        width: screenSize.width,
        // height: windowSize.height,
        top: 0,
        bottom: 0,
    },
    fixedBg: {
        position: 'absolute',
        width: screenSize.width,
        // height: windowSize.height,
        top: 0,
        bottom: 0,
        backgroundColor: '#0000007a',
    },
    box: {
    // position: 'absolute'
    },
});
