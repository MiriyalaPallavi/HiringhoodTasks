
require("dotenv").config(); 
const db = require('./db'); 
const Category = require('./models/Category'); 

const categories = [
  { name: 'Technology', description: 'Latest tech trends and news' },
  { name: 'Health', description: 'Wellness and nutrition tips' },
  { name: 'Travel', description: 'Travel destinations and stories' },
  { name: 'Food', description: 'Delicious recipes and reviews' },
  { name: 'Education', description: 'Learning and career development' },
];

const seedCategories = async () => {
  try {
    await Category.deleteMany(); 
    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding categories:", err);
  } finally {
    process.exit(); 
  }
};

db.then(seedCategories);
