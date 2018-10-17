const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

//========================== init code ===========================

async function getCourses() {
/*
  comparison operator: eq, ne, gt, gte, lt, lte, in, nin
  logical operator: or, and
  Regex /^s/: start with s    /s$/: end with s    /.*s.*  anything  i case-insensitive
*/

  const courses = await Course
  /*
    .find ({ price: { $gt: 10, $lt: 20 } })  ---> dollar sign indicating this is an comparison operator
    .find({ price: { $in: [10, 15, 20] } }) ---> price is 10 or 15 or 20
    .find()
    .or([ {author: 'Mosh'}, {isPublished: true} ]) ---> or
    .find( { author: /^Mosh/i}) ---> representing regex: string starts with Mosh
    .count() ---> returns the # of documents qualified

  */
    .find({ author: 'Mosh', isPublished: true })
    .limit(10)
    .sort({ name: 1 }) //1: ascending order   -1: descending order
    .select({ name: 1, tags: 1});  //only want name and tags to be returned
  console.log(courses);
}

getCourses();


/* Return value:
Course.find();

[ { tags: [ 'node', 'backend' ],
    date: 2018-10-17T00:54:08.396Z,
    _id: 5bc688301916e3433ade297c,
    name: 'Node.js Course',
    author: 'Mosh',
    isPublished: true,
    __v: 0 },
  { tags: [ 'angular', 'frontend' ],
    date: 2018-10-17T00:56:18.443Z,
    _id: 5bc688b20531f9433ca93528,
    name: 'Angular Course',
    author: 'Mosh',
    isPublished: true,
    __v: 0 } ]
*/
