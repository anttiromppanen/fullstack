import React from 'react';

const Total = ({ courseParts }: { courseParts: { name: string, exerciseCount: number }[] }) => {
  const numOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <p>
        Number of exercises{" "}
        {numOfExercises}
      </p>
    </div>
  )
}

export default Total;