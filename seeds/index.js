const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require ('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5fbfc085aa820328ed93e259',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, asperiores esse libero eligendi est beatae odio enim magnam tempora nisi nulla unde veniam eveniet ipsum alias, aut ex, dignissimos maxime!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images:[
        {
          url: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          filename: 'YelpCamp/tptndtrefhmksuuejjbw'
        },
        {
          url: 'https://images.unsplash.com/photo-1605891323102-f122146d86f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1794&q=80',
          filename: 'YelpCamp/za6j4mx3hxa4gf5npyb1'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
});
