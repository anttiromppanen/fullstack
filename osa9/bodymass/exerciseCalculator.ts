interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const parseArguments1 = (args: Array<string>): Array<number> => {
  args = args.slice(2);
  
  const inputs = args.map(x => {
    const value = Number(x);
    if (isNaN(value)) throw new Error('Only number values allowed');

    return value
  });

  return inputs;
}
console.log(parseArguments1(process.argv))
const calculateRating = (averageTrainingTime: number, dailyTargetHours: number): number => {
  if (averageTrainingTime >= dailyTargetHours) return 3;
  if (averageTrainingTime >= dailyTargetHours / 2) return 2;

  return 1;
}

const textRating = (rating: number): String => {
  if (rating === 3) return 'good';
  if (rating === 2) return 'ok';

  return 'bad';
}

const calculateExercises = (hours: Array<number>) => {
  const dailyTargetHours = 1;
  const numOfDays = hours.length;
  const numOfTrainingDays = hours.filter(x => x > 0).length;
  const averageTrainingTime = hours.reduce((a,b) => a + b, 0) / numOfDays;
  const targetSuccess = 
    hours.filter(x => x === 0).length > 0
      ? false
      : true
  const rating = calculateRating(averageTrainingTime, dailyTargetHours);
  const ratingAsText = textRating(rating);
  
  return {
    periodLength: numOfDays,
    trainingDays: numOfTrainingDays,
    success: targetSuccess,
    rating,
    ratingDescription: ratingAsText,
    target: dailyTargetHours,
    average: averageTrainingTime
  };
}


console.log(calculateExercises(parseArguments1(process.argv)));