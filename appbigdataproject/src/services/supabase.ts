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

export const signUpWithEmail = async (
  email: string,
  password: string,
  navigation: any,
  setUserId: any
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (!error) {
    setUserId(data.user?.id);
    navigation(`/${data.user?.id}/personalStats`);
  }
};

export const signInWithEmail = async (
  email: string,
  password: string,
  navigation: any,
  setUserId: any
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (!error) {
    setUserId(data.user?.id);
    navigation(`/${data.user?.id}/personalStats`);
  }
};

export const signOut = async (navigation: any) => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    navigation(`/login`);
  }
};

export const getUserHistorySupabase = async (userId: string) => {
  const { data, error } = await supabase
    .from("Game")
    .select("created_at, category_id, difficulty, score")
    .eq("user_id", userId);
  if (!error) {
    return data;
  }
};

export const sendEndgameResultsSupabase = async (
  userId: string,
  selectedCategoryId: number,
  selectedDifficulty: string,
  score: number
) => {
  const { error } = await supabase.from("Game").insert([
    {
      user_id: userId,
      category_id: selectedCategoryId,
      difficulty: selectedDifficulty,
      score,
    },
  ]);
  if (error) console.log(error);
};

export const computerScoresSupabase = async (setDataScoresPerPlayer: any) => {
  let totalScoresPerPlayer: IPlayerTotalScore[] = [];

  const { data: dataGames, error: errorGames } = await supabase
    .from("Game")
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

export const uploadFileToBucketSupabase = async (
  file: Blob,
  filename: string,
  userId: any
) => {
  const { error } = await supabase.storage
    .from("quizbucket")
    .upload(`${userId}/${filename}`, file);
  if (error) console.log(error);
};
