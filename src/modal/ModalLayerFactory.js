import React, { Component } from 'react';
import ModalLayerController from './ModalLayerController';
export default class ModalLayerFactory {
    static create(elem) {
        if (!this.self) {
            console.error('ModalLayers not loaded');
            return null;
        }
        let options;
        if (elem.prototype instanceof Component || elem instanceof Function)
            options = {
                component: props => React.createElement(elem, props),
                ...elem.modalLayerOptions,
            };
        else
            options = elem;
        const key = options.key || 'layer_' + this.index++;
        const oldLayer = this.getLayer(key);
        if (oldLayer)
            return oldLayer;
        const modalLayerController = new ModalLayerController(key, options, () => this.self);
        this.modalLayerControllers.add(modalLayerController);
        return modalLayerController;
    }
    static getLayer(key) {
        let layer = null;
        this.modalLayerControllers.forEach(ml => {
            if (ml.key === key) {
                layer = ml;
            }
        });
        return layer;
    }
    static delete(mlc) {
        const self = this.self;
        if (mlc) {
            if (Array.isArray(mlc)) {
                mlc.forEach(ad => this.delete(ad));
                return;
            }
            this.modalLayerControllers.delete(mlc);
            self.removeModalLayer(mlc.key);
        }
        else {
            self.modalLayers.clear();
            self.setState({
                modalLayers: [],
            });
            this.modalLayerControllers.clear();
        }
    }
    static hideAll() {
        this.forEach(mlc => {
            mlc.hide();
        });
    }
    static forEach(func) {
        this.modalLayerControllers.forEach(func);
    }
    static back() {
        let mdr;
        this.forEach(mlc => {
            if (mlc.modalLayerRef.state.isShow) {
                mdr = mlc;
            }
        });
        if (mdr) {
            mdr.backHandle();
            return true;
        }
        else
            return false;
    }
    static setModalLayersRef(mlsRef) {
        this.self = mlsRef;
    }
    static setElevation(elevation) {
        this.self.setElevation(elevation);
    }
}
ModalLayerFactory.index = 0;
ModalLayerFactory.modalLayerControllers = new Set();
