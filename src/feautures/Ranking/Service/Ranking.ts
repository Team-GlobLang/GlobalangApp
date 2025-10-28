import axiosInstance from "@core/AxiosConfig";
import axios from "axios";
import type { UsersStats } from "src/feautures/User/Interfaces/StatsInterfaces";
import type { StatsFilterDto } from "../Types/Stats.filter.interface";

export async function getTopLocal(country: string): Promise<UsersStats[]> {
  console.log(country);
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockUsers: UsersStats[] = [
    { fullName: "Ana Pérez", totalQuizzes: 15, averageScore: 92 },
    { fullName: "Luis Gómez", totalQuizzes: 12, averageScore: 88 },
    { fullName: "Carla Jiménez", totalQuizzes: 10, averageScore: 75 },
    { fullName: "Juan Mora", totalQuizzes: 20, averageScore: 60 },
  ];

  return mockUsers.sort((a, b) => b.averageScore - a.averageScore);
}

const GetRankin = async (data: StatsFilterDto) => {
  try {
    const response = await axiosInstance.get("ranking/ranking", {
      params: data,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Errro desconocido");
    }
  }
};

const GetRankinUser = async (data: StatsFilterDto) => {
  try {
    const response = await axiosInstance.get("stats/user-rankin", {
      params: data,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Errro desconocido");
    }
  }
};

export { GetRankin, GetRankinUser };
