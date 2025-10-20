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

  logout() {
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("uuid");
    localStorage.removeItem("refT");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("rememberMe");
  },
});
