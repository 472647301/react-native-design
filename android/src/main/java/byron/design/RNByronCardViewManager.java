// RNByronCardViewManager.java

package byron.design;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

public class RNByronCardViewManager extends ViewGroupManager<RNByronCardView> {

    public static final String REACT_CLASS = "RNByronCardView";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    public RNByronCardView createViewInstance(@NonNull ThemedReactContext reactContext) {
        RNByronCardView cardView = new RNByronCardView(reactContext);
        ReactViewGroup reactViewGroup = new ReactViewGroup(reactContext);
        cardView.addView(reactViewGroup);
        return cardView;
    }

    @ReactProp(name = "cornerRadius", defaultFloat = 0f)
    public void setCornerRadius(RNByronCardView view, float cornerRadius) {
        view.setRnCornerRadius(PixelUtil.toPixelFromDIP(cornerRadius));
    }

    @ReactProp(name = "cardElevation", defaultFloat = 0f)
    public void setCardElevation(RNByronCardView view, float elevation) {
        view.setRnElevation(elevation);
    }

    @ReactProp(name = "cardMaxElevation", defaultFloat = 0f)
    public void setCardMaxElevation(RNByronCardView view, float elevation) {
        view.setRnMaxElevation(elevation);
    }

    @ReactProp(name = "cornerOverlap")
    public void setPreventCornerOverlap(RNByronCardView view, boolean overlap) {
        view.setPreventCornerOverlap(overlap);
    }

    @ReactProp(name = "useCompatPadding")
    public void setUseCompatPadding(RNByronCardView view, boolean padding) {
        view.setUseCompatPadding(padding);
    }

    @ReactProp(name = "backgroundColor")
    public void setCardBackgroundColor(RNByronCardView view, int color) {
        view.setRnBackgroundColor(color);
    }

    @Override
    public View getChildAt(RNByronCardView parent, int index) {
        View content = parent.getChildAt(0);
        if (content instanceof ReactViewGroup) {
            return ((ReactViewGroup) content).getChildAt(index);
        }
        return null;
    }

    @Override
    public int getChildCount(RNByronCardView parent) {
        View content = parent.getChildAt(0);
        if (content instanceof ReactViewGroup) {
            return ((ReactViewGroup) content).getChildCount();
        }
        return 0;
    }

    @Override
    public void addView(RNByronCardView parent, View child, int index) {
        View content = parent.getChildAt(0);
        if (content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).addView(child, index);
        }
    }

    @Override
    public void removeViewAt(RNByronCardView parent, int index) {
        View content = parent.getChildAt(0);
        if (content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).removeViewAt(index);
        }
    }

    @Override
    public void removeAllViews(RNByronCardView parent) {
        View content = parent.getChildAt(0);
        if (content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).removeAllViews();
        }
    }
}
