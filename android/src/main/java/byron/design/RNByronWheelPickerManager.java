package byron.design;

import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;

import byron.design.wheelpicker.WheelPicker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author <a href="mailto:lesliesam@hotmail.com"> Sam Yu </a>
 */
public class RNByronWheelPickerManager extends SimpleViewManager<RNByronWheelPicker> {

    private static final String REACT_CLASS = "WheelCurvedPicker";

    private static final int DEFAULT_TEXT_SIZE = 25 * 2;
    private static final int DEFAULT_ITEM_SPACE = 14 * 2;
    private static final Handler mSDKHandler = new Handler(Looper.getMainLooper());

    private static void runOnMainThread(Runnable runnable) {
        mSDKHandler.postDelayed(runnable, 0);
    }

    @NonNull
    @Override
    protected RNByronWheelPicker createViewInstance(@NonNull ThemedReactContext reactContext) {
        RNByronWheelPicker picker = new RNByronWheelPicker(reactContext);
        // 设置数据项文本颜色
        picker.setItemTextColor(Color.LTGRAY);

        // 设置数据项文本尺寸大小
        picker.setItemTextSize(DEFAULT_TEXT_SIZE);

        // 设置当前选中的数据项文本颜色
        picker.setSelectedItemTextColor(Color.WHITE);

        // 设置滚轮选择器数据项之间间距
        picker.setItemSpace(DEFAULT_ITEM_SPACE);

        // 设置滚轮选择器是否显示指示器
        picker.setIndicator(true);

        // 设置滚轮选择器指示器尺寸
        picker.setIndicatorSize(2);

        // 设置滚轮选择器指示器颜色
        picker.setIndicatorColor(Color.WHITE);

        // 设置滚轮选择器是否显示幕布
        picker.setCurtain(false);

        // 设置滚轮选择器幕布颜色
        picker.setCurtainColor(Color.YELLOW);

        // 设置滚轮选择器是否有空气感
        picker.setAtmospheric(true);

        // 滚轮选择器是否开启卷曲效果
        picker.setCurved(true);

        // 设置滚轮选择器可见数据项数量
        picker.setVisibleItemCount(5);

        /**
         * 设置滚轮选择器数据项的对齐方式
         * ALIGN_CENTER = 0, ALIGN_LEFT = 1, ALIGN_RIGHT = 2;
         */
        picker.setItemAlign(0);

        return picker;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                ItemSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onValueChange")
        );
    }

    @ReactProp(name="data")
    public void setData(RNByronWheelPicker picker, ReadableArray items) {
        if (picker != null) {
            ArrayList<String> valueData = new ArrayList<>();
            ArrayList<String> labelData = new ArrayList<>();
            for (int i = 0; i < items.size(); i ++) {
                ReadableMap itemMap = items.getMap(i);
                valueData.add(itemMap.getString("value"));
                labelData.add(itemMap.getString("label"));
            }
            picker.setValueData(valueData);
            picker.setData(labelData);
        }
    }

    @ReactProp(name="selectedIndex")
    public void setSelectedIndex(final RNByronWheelPicker picker, final int index) {
        if (picker != null && picker.getState() == WheelPicker.SCROLL_STATE_IDLE) {
             //必须放在异步，否则不能确保生效https://github.com/AigeStudio/WheelPicker/issues/156
             runOnMainThread(new Runnable() {
                        @Override
                        public void run() {
                            picker.setSelectedItemPosition(index);
                            picker.invalidate();
                        }
                    });
        }
    }

    @ReactProp(name="textColor", customType = "Color")
    public void setTextColor(RNByronWheelPicker picker, Integer color) {
        if (picker != null) {
            picker.setItemTextColor(color);
        }
    }

    @ReactProp(name="curtainColor", customType = "Color")
    public void setCurtainColor(RNByronWheelPicker picker, Integer color) {
        if (picker != null) {
            picker.setCurtainColor(color);
        }
    }

    @ReactProp(name="textSize")
    public void setTextSize(RNByronWheelPicker picker, int size) {
        if (picker != null) {
            picker.setItemTextSize((int) PixelUtil.toPixelFromDIP(size));
        }
    }

    @ReactProp(name="itemSpace")
    public void setItemSpace(RNByronWheelPicker picker, int space) {
        if (picker != null) {
            picker.setItemSpace((int) PixelUtil.toPixelFromDIP(space));
        }
    }


    // 设置滚轮选择器是否显示指示器
    @ReactProp(name="indicator")
    public void setIndicator(RNByronWheelPicker picker, boolean hasIndicator) {
        if (picker != null) {
            picker.setIndicator(hasIndicator);
        }
    }
    // 设置滚轮选择器指示器颜色
    @ReactProp(name="indicatorColor", customType = "Color")
    public void setIndicatorColor(RNByronWheelPicker picker, Integer color) {
        if (picker != null) {
            picker.setIndicatorColor(color);
        }
    }
    // 设置滚轮选择器指示器尺寸
    @ReactProp(name="indicatorSize")
    public void setIndicatorSize(RNByronWheelPicker picker, int size) {
        if (picker != null) {
            picker.setIndicatorSize(size);
        }
    }

    // 设置滚轮选择器是否显示幕布
    @ReactProp(name="curtain")
    public void setCurtain(RNByronWheelPicker picker, boolean hasCurtain) {
        if (picker != null) {
            picker.setCurtain(hasCurtain);
        }
    }
    // 设置滚轮选择器幕布颜色
    @ReactProp(name="selectTextColor", customType = "Color")
    public void setSelectedTextColor(RNByronWheelPicker picker, Integer color) {
        if (picker != null) {
            picker.setSelectedItemTextColor(color);
        }
    }

    // 设置滚轮选择器是否有空气感
    @ReactProp(name="atmospheric")
    public void setAtmospheric(RNByronWheelPicker picker, boolean hasAtmospheric) {
        if (picker != null) {
            picker.setAtmospheric(hasAtmospheric);
        }
    }
    // 滚轮选择器是否开启卷曲效果
    @ReactProp(name="curved")
    public void setCurved(RNByronWheelPicker picker, boolean hasCurved) {
        if (picker != null) {
            picker.setCurved(hasCurved);
        }
    }
    // 设置滚轮选择器可见数据项数量
    @ReactProp(name="visibleItemCount")
    public void setVisibleItemCount(RNByronWheelPicker picker, int num) {
        if (picker != null) {
            picker.setVisibleItemCount(num);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
