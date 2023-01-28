import { createClient } from "@supabase/supabase-js";

export interface IPlayerTotalScore {
  userId: number;
  username: string;
  totalScore: number;
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_KEY || ""
);

export const handleConnectionSupabase = async (
  pseudo: string,
  password: string,
  navigation: any
) => {
  const { data, error } = await supabase
    .from("Authentication")
    .select("id")
    .eq("username", pseudo)
    .eq("password", password);
  if (!error) {
    navigation(`/game/${data[0].id}/preparation`, {
      state: { connected: true },
    });
  }
};

export const handleRegisterSupabase = async (
  pseudo: string,
  password: string,
  confirmPassword: string,
  navigation: any
) => {
  if (password === confirmPassword) {
    const { data, error } = await supabase
      .from("Authentication")
      .insert({ username: pseudo, password })
      .select("id");
    if (!error) {
      navigation(`/game/${data[0].id}/preparation`, {
        state: { connected: true },
      });
    }
  }
};

export const sendEndgameResultsSupabase = async (
  userId: string,
  selectedCategoryId: number,
  selectedDifficulty: string,
  score: number
) => {
  const { error } = await supabase.from("Games").insert([
    {
      user_id: userId,
      category: selectedCategoryId,
      difficulty: selectedDifficulty.toLowerCase(),
      score,
    },
  ]);
  console.log(error);
};

export const computerScoresSupabase = async (setDataScoresPerPlayer: any) => {
  let totalScoresPerPlayer: IPlayerTotalScore[] = [];

  const { data: dataGames, error: errorGames } = await supabase
    .from("Games")
    .select("user_id, score");
  const { data: dataUsernames, error: errorUsernames } = await supabase
    .from("Authentication")
    .select("id, username");

  if (!errorUsernames) {
    for (let dataUsername of dataUsernames) {
      totalScoresPerPlayer.push({
        userId: dataUsername.id,
        username: dataUsername.username,
        totalScore: 0,
      });
    }
  }

  if (!errorGames) {
    for (let game of dataGames) {
      for (let player of totalScoresPerPlayer) {
        if (game.user_id === player.userId) {
          player.totalScore += game.score;
        }
      }
    }
    totalScoresPerPlayer.sort(
      (player1, player2) => player2.totalScore - player1.totalScore
    );
    setDataScoresPerPlayer(totalScoresPerPlayer);
  }
};
