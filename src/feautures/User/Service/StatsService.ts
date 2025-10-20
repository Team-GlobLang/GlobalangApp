import type { UserStats } from "../Interfaces/StatsInterfaces";

async function getUserStats(userId: string): Promise<UserStats> {
  console.log(userId);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalQuizzes: 12,
    averageScore: 78,
  };
}

export { getUserStats };
