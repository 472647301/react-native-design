import { Easing } from 'react-native';
import React from 'react';
import ModalLayer from './ModalLayer';
import ModalLayerAnimated from './ModalLayerAnimated';
export default class ModalLayerController {
    constructor(key, options, getModalLayers) {
        this.key = key;
        this.options = options;
        this.getModalLayers = getModalLayers;
        this.didHide = () => { };
        this.didShow = () => { };
        this.onShow = () => { };
        this.onHide = () => { };
        this.onLoad = () => { };
        this.createModalLayer(key, options);
    }
    createModalLayer(key, options, callback) {
        const { zIndex = 0 } = options;
        const modalLayer = (<ModalLayer key={key} zIndex={zIndex} ref={modalLayerRef => {
            if (modalLayerRef) {
                this.modalLayerRef = modalLayerRef;
                modalLayerRef.mlc = this;
            }
        }} shadePress={options.shadePress} shade={options.shade}/>);
        this.getModalLayers().addModalLayer(modalLayer, callback);
    }
    getComponent(...args) {
        const component = this.options.component;
        /*const beforeRef = (content as any).ref;
        content = React.cloneElement(content as ReactElement<any>, {
          ref: ref => {
            if(ref) {
              if(ref.wrappedInstance) ref.wrappedInstance.layer = this; // modalLayerRef;
              else ref.layer = this; // modalLayerRef;
              if(beforeRef) beforeRef(ref);
            }
          }
        })*/
        return typeof component === 'function'
            ? component(...args)
            : component;
    }
    show(...args) {
        const modalLayerRef = this.modalLayerRef;
        if (!modalLayerRef)
            return setTimeout(() => this.show(...args), 10);
        if (!modalLayerRef.__isMounted)
            return this.createModalLayer(this.key, this.options, () => this.show(...args));
        const { boxStyle, act = ModalLayerAnimated.SCALE, hideEasing, showEasing = Easing.elastic(1), showDuration = 400, hideDuration = 200, } = this.options;
        modalLayerRef.hideEasing = hideEasing;
        modalLayerRef.showEasing = showEasing;
        modalLayerRef.showDuration = showDuration;
        modalLayerRef.hideDuration = hideDuration;
        modalLayerRef
            .show({
            component: this.getComponent(...args),
            boxStyle,
            act,
        })
            .then(() => this.didShow());
        this.onShow();
    }
    preload(...args) {
        if (this.modalLayerRef)
            this.modalLayerRef.preload(this.getComponent(...args), () => this.onLoad());
        else
            setTimeout(() => this.preload(...args), 10);
    }
    setOptions(options) {
        this.options = { ...this.options, ...options };
    }
    hide() {
        this.onHide();
        if (this.modalLayerRef.__isMounted)
            this.modalLayerRef.hide().then(() => this.didHide());
    }
    backHandle(e) {
        const { backHandle } = this.options;
        if (!(backHandle && backHandle(e))) {
            this.hide();
        }
    }
}
