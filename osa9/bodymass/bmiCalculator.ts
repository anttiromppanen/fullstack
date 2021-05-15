interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): String => {
  const bmi = weight / ((height / 100)**2);
  
  switch(true) {
    case (bmi >= 40): return 'Obese Class III (Very severely obese)';
    case (bmi >= 35): return 'Obese Class II (Severely obese)';
    case (bmi >= 30): return 'Obese Class I (Moderately obese)';
    case (bmi >= 25): return 'Overweight';
    case (bmi >= 18.5): return 'Normal (healthy weight)';
    case (bmi >= 16): return 'Underweight';
    case (bmi >= 15): return 'Severely underweight';
    case (bmi >= 1): return 'Very severely underweight';
    default:
      throw new Error('bmi error');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log('Error', error.message);
}