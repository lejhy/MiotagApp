package com.miotag;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "miotag";
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
     super.onConfigurationChanged(newConfig);
     Intent intent = new Intent("onConfigurationChanged");
     intent.putExtra("newConfig", newConfig);
     this.sendBroadcast(intent);
  }
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
  }
}
