import React, { Component } from 'react';
import { View } from 'react-native';
import ModalLayerFactory from './ModalLayerFactory';
export default class ModalLayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalLayers: [],
            elevation: 99,
        };
        this.modalLayers = new Map();
        this.addModalLayer = (modalLayer, callback) => {
            this.modalLayers.set(modalLayer.key, modalLayer);
            this.setState({
                modalLayers: Array.from(this.modalLayers.values()).sort((a, b) => {
                    return a.props.zIndex - b.props.zIndex;
                }),
            }, callback);
        };
        this.removeModalLayer = (key) => {
            if (typeof key === 'string') {
                this.modalLayers.delete(key);
                this.setState({
                    modalLayers: Array.from(this.modalLayers.values()),
                });
            }
        };
        ModalLayerFactory.setModalLayersRef(this);
    }
    render() {
        return (<View style={{ flex: 1 }}>
        {this.props.children}
        <View pointerEvents={'box-none'} style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            elevation: this.state.elevation< 201 ? 201 : this.state.elevation,
            zIndex: 201
        }}>
          {this.state.modalLayers}
        </View>
      </View>);
    }
    setElevation(elevation) {
        this.setState({ elevation });
    }
    componentWillUnmount() {
        // console.log('清除！！！')
        // 不能设置为空，应为app退出时有的组件执行析构函数时会删除layer，如果设置为空，会导致获取不到删除函数
        // ModalLayerFactory.setModalLayersRef(null)
    }
}
