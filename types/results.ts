export type ResultsType = {
    num_workouts: number;
    top_exercises: { [exercise: string]: number }; // A dictionary mapping exercise names to counts
    total_weight_lifted: number;
    most_common_day: string; // Name of the day
    most_common_time_of_day: string;
  };