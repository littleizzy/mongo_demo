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

async function removeCourse1(id) {
  const result = await Course.deleteOne({ _id: id}); // if filter query is more generic(has multiple object), it will delete the first one
  console.log(result);
}

async function removeCourse2(id) {
  //const result = await Course.deleteMany({ _id: id}); // this way we dont get the course obj back
  const course = await Course.findByIdAndRemove(id); // this way we retrieve the object
  console.log(course);
}


removeCourse2('5bc688301916e3433ade297c');
