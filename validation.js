const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground_validation')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));


//========================== validation code ===========================
// MongoDB doesn't care what values in the document, this validation is enforced at mongoose level
// We use Joi to validate user input, mongoose to validate right before we put the document in the mongodb

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: 'A course should have at least one tag'
    }
  },


  /* sync version
  tags: {
    type: Array, // mongoose will initialize this to empty array
    validate: { //set validate property to an object, which contains a validator function and a message
      validator: function(v) { //implement custom validation logic
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag'
    }
  },
  */


  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; }, // can't use => here because it cant access this
    min: 10,
    max: 200,
    get: v => Math.round(v), // getter incase manually change to a float in db
    set: v => Math.round(v) 
  }
});

const Course = mongoose.model('Course', courseSchema);

//========================== init code ===========================

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: '-',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: false
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors)
      console.log(err.errors[field].message);
  }
}

createCourse();
