import React from 'react';
import { CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
}

export default Part;