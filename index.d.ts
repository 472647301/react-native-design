declare module "@byron-react-native/design" {
  import { Component } from "react";
  import {
    View,
    ViewProps,
    StyleProp,
    ViewStyle,
    TextStyle,
    Animated,
    TouchableWithoutFeedbackProps,
    TransformsStyle,
    EasingFunction,
    GestureResponderEvent,
  } from "react-native";

  export class ShadowView extends View {}

  /**
   * @see PickerIOS.ios.js
   */
  interface PickerIOSItemProps {
    value?: string | number;
    label?: string;
  }

  /**
   * @see PickerIOS.ios.js
   */
  class PickerIOSItem extends React.Component<PickerIOSItemProps> {}

  /**
   * @see Picker.js
   */
  export interface PickerItemProps {
    testID?: string;
    color?: string;
    label: string;
    value?: any;
  }

  export class PickerItem extends React.Component<PickerItemProps> {}

  export interface PickerProps extends ViewProps {
    style?: StyleProp<ViewStyle>;
    /**
     * 指定应用在每项标签上的样式。
     */
    itemStyle?: StyleProp<TextStyle>;
    /**
     * 默认选中的值。可以是字符串或整数。
     */
    selectedValue: number | string;
    /**
     * 某一项被选中时执行此回调
     */
    onValueChange: (value: number | string) => any;
  }
  /**
   * 底层的Wheel原生组件，iOS端基于RN自带的PickerIOS组件，android端封装的[https://github.com/AigeStudio/WheelPicker]
   * 所以其他Picker组件均基于该组件进行封装
   */
  export class Picker extends React.Component<PickerProps, any> {
    static Item: typeof PickerIOSItem;
  }

  /**
   * 所有Picker组件的公用header组件
   */
  export interface IPickerHeaderProps {
    /**
     * 最外层容器样式
     */
    pickerToolBarStyle?: StyleProp<ViewStyle>;
    /**
     * 标题
     */
    pickerTitle?: string;
    /**
     * 标题样式
     */
    pickerTitleStyle?: StyleProp<TextStyle>;
    /**
     * 左侧的按钮文本(默认值: 取消)
     */
    pickerCancelBtnText?: string;
    /**
     * 左侧的按钮容器样式
     */
    pickerCancelBtnStyle?: StyleProp<ViewStyle>;
    /**
     * 左侧的按钮文字样式
     */
    pickerCancelBtnTextStyle?: StyleProp<TextStyle>;
    /**
     * 右侧的按钮文本(默认值: 确定)
     */
    pickerConfirmBtnText?: string;
    /**
     * 右侧的按钮容器样式
     */
    pickerConfirmBtnStyle?: StyleProp<TextStyle>;
    /**
     * 右侧的按钮文字样式
     */
    pickerConfirmBtnTextStyle?: StyleProp<TextStyle>;
    /**
     * 左侧的按钮回调事件
     */
    onPickerCancel?: (value?: any) => void;
    /**
     * 右侧的按钮回调事件
     */
    onPickerConfirm?: (value: any) => void;
  }

  /**
   * header的高度为40
   */
  export class PickerHeader extends React.Component<IPickerHeaderProps, any> {}

  export interface ICommonPickerProps
    extends IPickerHeaderProps,
      Pick<PickerProps, "itemStyle"> {
    style?: StyleProp<ViewStyle>;
    /**
     * 默认值为true，如果设为false，则IPickerHeaderProps里面的属性均无效
     */
    showHeader?: boolean;
    /**
     * 包裹picker的容器的样式
     */
    pickerWrapperStyle?: StyleProp<ViewStyle>;
    /**
     * 单个wheel的样式
     */
    wheelStyles?: Array<StyleProp<ViewStyle>>;
    pickerElevation?: number;
    /**
     * picker数据
     */
    pickerData: any;
    /**
     * 已选择的值
     */
    selectedValue: string | number | Array<string | number>;
    onPickerCancel?: (value: any) => void;
    onValueChange?: (value: any, wheelIndex: number) => void;
  }

  export class CommonPicker extends React.Component<ICommonPickerProps, any> {}

  export interface IDatePickerProps
    extends Omit<
      ICommonPickerProps,
      "selectedValue" | "onValueChange" | "pickerData" | "onPickerConfirm"
    > {
    //年月日单位，默认为：年 月 日 时 分 秒
    labelUnit?: {
      year?: string;
      month?: string;
      date?: string;
      hour?: string;
      minute?: string;
      second?: string;
    };
    //初始默认值,默认为当前时间
    date?: Date;
    //最小日期,默认为当前时间的前10年
    minDate?: Date;
    //最大日期,默认为当前时间的后10年
    maxDate?: Date;
    /**
     * 选择模式
     */
    mode?: "year" | "month" | "date" | "time" | "datetime";
    onDateChange?: (value: Date) => void;
    /**
     * 确定回调事件
     * 无论哪种模式均返回一个date对象，需要自己格式化数据
     */
    onPickerConfirm?: (value: Date) => void;
  }

  export class DatePicker extends React.Component<IDatePickerProps, any> {}

  export interface ModalControllerSetOptions {
    boxStyle?: ViewStyle;
    act?: ModalLayerShowOptions["act"];
    hideEasing?: EasingFunction;
    showEasing?: EasingFunction;
    showDuration?: number;
    hideDuration?: number;
    key?: string;
    backHandle?: (event: GestureResponderEvent) => boolean;
  }
  export interface ModalControllerOptions extends ModalControllerSetOptions {
    component: React.ComponentClass<any> | React.ReactElement | null | Function;
  }
  export class ModalLayerController {
    key: string;
    private options;
    private getModalLayers;
    modalLayerRef: ModalLayer;
    constructor(
      key: string,
      options: ModalControllerOptions,
      getModalLayers: () => ModalLayers
    );
    private createModalLayer;
    private getComponent;
    show(...args: any[]): any;
    preload(...args: any[]): void;
    setOptions(options: ModalControllerSetOptions): void;
    hide(): void;
    backHandle(e: any): void;
    didHide: ((this: ModalLayerController) => void) | null;
    didShow: ((this: ModalLayerController) => void) | null;
    onShow: ((this: ModalLayerController) => void) | null;
    onHide: ((this: ModalLayerController) => void) | null;
    onLoad: ((this: ModalLayerController) => void) | null;
  }
  export class ModalLayerAnimated {
    static SCALE: (ani: any) => {
      scale: any;
    }[];
    static TRANSLATE_Y: (ani: any) => {
      translateY: any;
    }[];
    static TRANSLATE_Y_B: (ani: any) => {
      translateY: any;
    }[];
    static TRANSLATE_X: (ani: any) => {
      translateX: any;
    }[];
    static TRANSLATE_X_B: (ani: any) => {
      translateX: any;
    }[];
  }
  interface ModalLayerProps {
    shadePress: TouchableWithoutFeedbackProps["onPress"];
    shade?: boolean;
    zIndex?: number;
  }
  interface ReactComponent {
    component: React.ComponentClass<any> | React.ReactElement<any> | null;
  }
  export interface ModalLayerShowOptions extends ReactComponent {
    boxStyle?: ViewStyle;
    act?: (ani: Animated.Value) => TransformsStyle["transform"];
  }
  export class ModalLayer extends React.Component<ModalLayerProps> {
    state: {
      isShow: boolean;
      showAnimated: Animated.Value;
      transform: any[];
      boxStyle: {};
      contentComponent: any;
    };
    isAction: boolean;
    contentComponent: ModalLayerShowOptions["component"];
    boxStyle: ViewStyle;
    transform: any;
    showEasing: EasingFunction;
    hideEasing: EasingFunction;
    showDuration: number;
    hideDuration: number;
    mlc: ModalLayerController;
    __isMounted: boolean;
    private _subscriptions;
    private keyboardIsShow;
    private keyboardDidShowHandle;
    private keyboardDidHideHandle;
    componentDidMount(): void;
    componentWillUnmount(): void;
    toggle(isShow: any): Promise<unknown>;
    render(): JSX.Element;
    preload(component: any, callback?: any): void;
    show(options?: ModalLayerShowOptions): Promise<unknown>;
    hide(): Promise<void>;
  }
  export interface CreateOptions {
    shade?: boolean;
    shadePress?: TouchableWithoutFeedbackProps["onPress"];
    zIndex?: number;
  }
  interface CreateModalOptions extends CreateOptions, ModalControllerOptions {}
  export class ModalLayerFactory {
    private static index;
    private static modalLayerControllers;
    private static self;
    static create(
      elem: CreateModalOptions | React.ElementType
    ): ModalLayerController;
    static getLayer(key: string): ModalLayerController;
    static delete(mlc: ModalLayerController | ModalLayerController[]): void;
    static hideAll(): void;
    static forEach(func: (value: ModalLayerController) => void): void;
    static back(): boolean;
    static setModalLayersRef(mlsRef: ModalLayers): void;
    static setElevation(elevation: number): void;
  }
  export class ModalLayers extends Component {
    state: {
      modalLayers: any[];
      elevation: number;
    };
    modalLayers: Map<any, any>;
    constructor(props: any);
    render(): JSX.Element;
    addModalLayer: (
      modalLayer: React.ReactElement<
        ModalLayer,
        | string
        | ((
            props: any
          ) => React.ReactElement<
            any,
            string | any | (new (props: any) => React.Component<any, any, any>)
          >)
        | (new (props: any) => React.Component<any, any, any>)
      >,
      callback?: () => void
    ) => void;
    removeModalLayer: (key: string) => void;
    setElevation(elevation: number): void;
    componentWillUnmount(): void;
  }
}
