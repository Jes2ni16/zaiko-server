const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  projectUrl: {
    type: String,
    default: '',
  },
  projectName:{
    type:String
      },
  description:{
type:String
  },
  image:{
    type:[String]
      },
location: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
amenities: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
building: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
house_models: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
sample_computation: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
deliverables: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
requirements: {
  description:{
    type:String,
  },
  list:{
    type:[String],
  },
  images:{
    type:[String]
  }
},
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
