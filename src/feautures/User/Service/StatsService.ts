import type { UsersStats, UserStats } from "../Interfaces/StatsInterfaces";

async function getUserStats(userId: string): Promise<UserStats> {
  console.log(userId);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalQuizzes: 12,
    averageScore: 78,
  };
}

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

export { getUserStats };
