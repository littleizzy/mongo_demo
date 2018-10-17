// mongoose is a package allows us to access mongodb with simpler api
const mongoose = require('mongoose');

/*
   hard-coded here, should come from config file in real life
   /playground automatically creates database for first time
   connect() returns a promise!
*/
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

/*
In mongoose, it has a concept of schema which is only for mongoose not for mongodb.
A schema to define the shape of document within the collection of MongoDB
*/

/*
Collections - Documents in mongo is like Tables - Rows in relational database
A document is a container of K-V pairs
*/

// Step 1:Creating a schema class: defines the shape of course document in MongoDB
// Types: String, Number, Date, Buffer, Boolean, ObjectID, Array
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Step 2: Compile the schema into a model/class
// Classes, objects   ->  Course, nodeCourse
const Course = mongoose.model('Course', courseSchema); //(singular name of the collection, given schema);


async function createCourse() { //async signature because await is used

  // Step 3: Create an object based on the class Course that's mapped to a course document
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'], // in relational database, only singel value. To achieve this, need course, tag, course_to_tag three tables
    isPublished: true
  });

  // Step 4: save it to the db
  const result = await course.save(); //result stores the actual course objects
  console.log(result);
}
