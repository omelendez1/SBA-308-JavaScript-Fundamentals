// The provided course information.
let course = {
  id: 451,
  name: "Intro to JavaScript"
};

  // The provided assignment group.
let assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// Learner submissions (how students performed on assignments)
let learnerData = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
 },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Step 1: Put learner submissions into a grouped object
let learners = {};

for (let i = 0; i < learnerData.length; i++) {
  let entry = learnerData[i];
  let learnerId = entry.learner_id;
///
/* if (!entry.submission || typeof entry.submission.score !== "number") {
  console.warn(`Invalid or missing submission for learner ${learnerId}`);
  continue;
} */
  // if learner doesn't exist yet, make a new list for them
  if (!learners[learnerId]) {
    
    
    
    learners[learnerId] = [];
  }

  // Find the assignment info
  let foundAssignment = null;
  for (let j = 0; j < assignmentGroup.assignments.length; j++) {

if (assignmentGroup.assignments[j].id === entry.assignment_id) {
      foundAssignment = assignmentGroup.assignments[j];
      
      break;
}
}

  // Calculate percentage
/* let score = Number(entry.submission.score);
let total = Number(foundAssignment.points_possible); */
let score = entry.submission.score;
let total = foundAssignment.points_possible;
let percentage = (score / total) * 100;

  // Save it
  learners[learnerId].push({
    assignmentId: entry.assignment_id,
    assignmentName: foundAssignment.name,
    grade: percentage
  });
}

// Step 2: Make student objects
let studentList = [];

for (let id in learners) {
  let gradesOnly = [];
  //
  for (let k = 0; k < learners[id].length; k++) {
    gradesOnly.push(learners[id][k].grade);
  }

  studentList.push({
    id: parseInt(id),
    name: "Student " + id,
   
    grades: gradesOnly
  });
}

console.log("Student Info:");



console.log(studentList);

// TASK 1: Go through each student and get their average
console.log("\n--- TASK 1: Average Grades ---");
for (let i = 0; i < studentList.length; i++) {
  let student = studentList[i];
  let total = 0;

  for (let j = 0; j < student.grades.length; j++) {
    total += student.grades[j];
  }

  let avg = total / student.grades.length;
  student.averageGrade = avg;

  console.log(student.name + "'s average: " + avg.toFixed(2));
}

// TASK 2: Make summary strings for each student

console.log("\n--- TASK 2: Summaries ---");
    let summaries = [];

for (let i = 0; i < studentList.length; i++) {
    let s = studentList[i];
   let summary = s.name + "has an average grade of"+ s.averageGrade.toFixed(2);
  summaries.push(summary);
}
for (let i = 0; i < summaries.length; i++) {
  
    console.log(summaries[i]);//might need to add a newline here
}

// TASK 3: Find honor roll students (avg >= 85)
console.log("\n--- TASK 3: Honor Roll ---");
for (let i = 0; i < studentList.length; i++) {
  let s = studentList[i];
  if (s.averageGrade >= 85) {
    console.log(s.name + " - Average: " + s.averageGrade.toFixed(2));
  }
}