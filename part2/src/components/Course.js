import React from 'react'

const Header = ({ course }) => (  <h1>{course}</h1> );

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    { parts.map( (part) => (<Part key={part.id} part={part}/>) ) }
  </>
);

const Course = ({ course }) => {
  const total = course.parts.map( (part) => part.exercises).reduce( (prev, curr) => prev + curr);

  return (
    <>
      <Header course={ course.name } />
      <Content parts={ course.parts } />
      <strong>total of {total} exercises</strong>
    </>
  )
}

export default Course;
