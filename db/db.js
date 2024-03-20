require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB server'))
 .catch((error) => console.error('Could not connect to MongoDB', error));


const productsSchema = new mongoose.Schema({
 productId: Number,
 campus: String,
 slogan: String,
 description: String,
 category: String,
 defaultPrice: String,
 createdAt: String,
 updatedAt: String
});


const questionsSchema = new mongoose.Schema({
 questionId: Number,
 questionBody: String,
 questionDate: String,
 askerName: String,
 questionHelpfulness: Number,
 reported: Boolean,
 answers: Object,
});


const answersSchema = new mongoose.Schema({
 answerId: Number,
 questionId: Number,
 body: String,
 date: Date,
 answererName: String,
 helpfulness: Number
});


const photosSchema = new mongoose.Schema({
 photoId: Number,
 answerId: Number,
 url: String,
});


const Product = mongoose.model('Product', productsSchema);


const newProduct = new Product({
 productId: 101,
 campus: 'Main Test Campus',
 slogan: 'We be DBing.',
 description: 'A detailed description of the product.',
 category: 'Electronics',
 defaultPrice: '299.99',
 createdAt: new Date().toISOString(),
 updatedAt: new Date().toISOString(),
});




newProduct.save()
 .then(doc => console.log('New prodcut saved:', doc))
 .catch(err => console.error('Error saving new product:', err));




