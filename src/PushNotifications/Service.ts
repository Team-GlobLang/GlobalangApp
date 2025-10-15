import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import axiosInstance from "@core/AxiosConfig";
import type { Router } from "vue-router";

export async function registerPush(router: Router) {
  if (!Capacitor.isNativePlatform()) return;

  const perm = await PushNotifications.requestPermissions();
  if (perm.receive !== "granted") return;

  await PushNotifications.register();

  PushNotifications.addListener("registration", async (token) => {
    try {
      await axiosInstance.post("notifications/register", {
        token: token.value,
        app: "GLOB"
      });
    } catch (e) {}
  });

  PushNotifications.addListener("pushNotificationActionPerformed", () => {
    router.push({ name: "start" });
  });
}
