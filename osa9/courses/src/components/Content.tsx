import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const parts = courseParts
    .map(x => <Part key={x.name} part={x} />);

  return (
    <div>
     {parts} 
    </div>
  )
}

export default Content;