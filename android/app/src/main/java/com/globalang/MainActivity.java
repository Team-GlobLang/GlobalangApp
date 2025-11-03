package com.globalang;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Obtener la instancia del WebView de Capacitor
        webView = this.bridge.getWebView();

        if (webView != null) {
            WebSettings ws = webView.getSettings();

            // Deshabilitar zoom
            ws.setSupportZoom(false);
            ws.setBuiltInZoomControls(false);
            ws.setDisplayZoomControls(false);
        }
    }

    @Override
    public void onBackPressed() {
        // Si la WebView puede retroceder, retrocede
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            // Si no, llama al comportamiento normal (cerrar app)
            super.onBackPressed();
        }
    }
}
