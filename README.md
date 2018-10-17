# mongo_demo
mongoDB + mongoose learning with CRUD operations


Modeling Relationships: 
Trade off between query performance vs consistency

1. Using References (Normalization) -> CONSISTENCY: only need to change one place, but every query need to find two places
let author = {
  name: 'Izzy'
}

let course = {
  author: 'id'
}


2. Using Embedded Documents (Denormalization) -> QUERY PERFORMANCE
let course ={
  author: {
    name: 'Izzy'
  }
}


3. Hybrid approach (store partial properties as embedded doc.): useful if need a snapshot of data at the point in time
let author = {
  name: 'Izzy'
  //50 other properties
}

let = course {
  author: {
    id: 'id',
    name: 'Izzy'
  }
}
