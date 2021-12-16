package byron.design;

import android.content.Context;
import androidx.cardview.widget.CardView;
import android.util.AttributeSet;

import com.facebook.react.uimanager.PixelUtil;

/**
 * Created by kishan on 26/4/17.
 */

public class RNByronCardView extends CardView {

    public RNByronCardView(Context context) {
        super(context);
    }

    public RNByronCardView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public RNByronCardView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setRnCornerRadius(float cornerRadius) {
        setRadius(cornerRadius);
    }

    public void setRnElevation(float elevation) {
        setCardElevation(PixelUtil.toPixelFromDIP(elevation));
    }

    public void setRnMaxElevation(float elevation) {
        setMaxCardElevation(PixelUtil.toPixelFromDIP(elevation));
    }

    public void setRnBackgroundColor(int color) {
        setCardBackgroundColor(color);
    }
}