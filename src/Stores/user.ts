import { countries } from "@core/CountriesArray";
import { reactive } from "vue";

export interface User {
  id: string;
  fullName: string;
  country: string;
  birthDate: Date;
  email: string;
  membership: string;
  role: string;
  isActived: boolean;
  membershipStartDate: Date | null;
  membershipExpiration: Date | null;
  membershipRenewDate: Date | null;
  activeTrial: boolean | null;
}

const storedUser = localStorage.getItem("user");

export const userStore = reactive({
  user: storedUser ? (JSON.parse(storedUser) as User) : null,

  setUser(userData: User) {
    this.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  },

  setTrialResponse(response: string) {
    if (this.user?.id) {
      localStorage.setItem(`FreeTrialResponse_${this.user.id}`, response);
    }
  },

  getTrialResponse(): string | null {
    if (this.user?.id) {
      return localStorage.getItem(`FreeTrialResponse_${this.user.id}`);
    }
    return null;
  },

  logout() {
    if (this.user?.id) {
      localStorage.removeItem(`FreeTrialResponse_${this.user.id}`);
    }

    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("uuid");
    localStorage.removeItem("refT");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("rememberMe");
  },

  getUserLanguage(): string | null {
    if (!this.user?.country) return null;

    const countryInfo = countries.find(
      (c) => c.name.toLowerCase() === this.user!.country.toLowerCase()
    );

    return countryInfo?.languages[0] || null;
  },
});
