interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

interface InputValues {
  targetTime: number;
  inputs: Array<number>;
}

const parseArguments1 = (args: Array<string>): InputValues => {
  args = args.slice(2);
  const targetTime = Number(args.shift())

  const inputs = args.map(x => {
    const value = Number(x);
    if (isNaN(value)) throw new Error('Only number values allowed');

    return value
  });

  return {
    targetTime,
    inputs
  };
}

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

const calculateExercises = (hours: InputValues) => {
  const dailyTargetHours = hours.targetTime;
  const numOfDays = hours.inputs.length;
  const numOfTrainingDays = hours.inputs.filter(x => x > 0).length;
  const averageTrainingTime = hours.inputs.reduce((a,b) => a + b, 0) / numOfDays;
  const targetSuccess = 
    hours.inputs.filter(x => x === 0).length > 0
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