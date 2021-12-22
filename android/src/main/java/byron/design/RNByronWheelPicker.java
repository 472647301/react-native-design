package byron.design;

import android.annotation.SuppressLint;

import byron.design.wheelpicker.WheelPicker;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.List;
import java.util.Objects;

/**
 * @author <a href="mailto:lesliesam@hotmail.com"> Sam Yu </a>
 */
@SuppressLint("ViewConstructor")
public class RNByronWheelPicker extends WheelPicker {

    private final EventDispatcher mEventDispatcher;
    private List<String> mValueData;

    private int mState;

    public RNByronWheelPicker(ReactContext reactContext) {
        super(reactContext);
        mEventDispatcher = Objects.requireNonNull(reactContext.getNativeModule(UIManagerModule.class)).getEventDispatcher();
        setOnWheelChangeListener(new OnWheelChangeListener() {
            @Override
            public void onWheelScrolled(int offset) {
            }

            @Override
            public void onWheelSelected(int position) {
                if (mValueData != null && position < mValueData.size()) {
                    mEventDispatcher.dispatchEvent(
                            new ItemSelectedEvent(getId(), mValueData.get(position)));
                }
            }

            @Override
            public void onWheelScrollStateChanged(int state) {
                mState = state;
            }
        });
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public void setValueData(List<String> data) {
        mValueData = data;
    }

    public int getState() {
        return mState;
    }

}

class ItemSelectedEvent extends Event<ItemSelectedEvent> {

    public static final String EVENT_NAME = "wheelCurvedPickerPageSelected";

    private final String mValue;

    protected ItemSelectedEvent(int viewTag,  String value) {
        super(viewTag);
        mValue = value;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putString("data", mValue);
        return eventData;
    }
}
