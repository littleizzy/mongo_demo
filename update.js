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


async function updateCourse1(id) {
/*
   Approach1: Query first: findById() -> modify -> save()
*/

  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = 'Another Author';
  /* same as
  course.set({
    isPublished: true,
    author: 'Another Author'
  });
  */
  const result = await course.save();
  console.log(result);
}

async function updateCourse2(id) {
/*
  Approach2: Update first: update directly in the database -> optionally get the updated object
*/
  const result = await Course.update({ _id: id}, { //update multiple or single object in one go
    $set : {
      author: 'Mosh',
      isPublished: false
    }
  }); //search mongodb update operator
  // result now holds the res of the update operation rather than the course object
  console.log(result);
}

async function updateCourse3(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Mosh',
      isPublished: true
    }
  }, { new: true}); //with this third parameter, we will get the updated course object
  console.log(course); //we will get the document before the operation without the third parameter
}

updateCourse3('5bc688301916e3433ade297c');
