// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: [true, 'Please provide product name'],
//       unique: true,
//       maxlength: [100, 'Name can not be more than 100 characters'],

//     },
//     price: {
//       type: Number,
//       required: [true, 'Please provide product price'],
//       default: '',
//     },
//     brand:{
//       type: String,
//       //required : true,
//     },
//     description: {
//       type: String,
//       required: [true, 'Please provide product description'],
//       maxlength: [1000, 'Description can not be more than 1000 characters'],
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category'
//     },
//     company: {
//       type: String,
//       required: [true, 'Please provide company'],
//       // enum: {
//       //   values: ['ikea', 'liddy', 'marcos'],
//       //   message: '{VALUE} is not supported',
//       // },
//     },
//     color: {
//       type: [String],
//       default: ['#222'],
//     },
//     specifics:{
//       type: String,
//       required: true
//     },
//     // featured: {
//     //   type: Boolean,
//     //   default: false,
//     // },
//     // // inventory: {
//     //   type: Number,
//     //   required: true,
//     //   default: 15,
//     // },
//     // averageRating: {
//     //   type: Number,
//     //   default: 0,
//     // },
//     // numOfReviews: {
//     //   type: Number,
//     //   default: 0,
//     // },
//      whatsapp:{
//         type: String,
//         default: ''
//     },
//      instagram:{
//       type: String,
//       default: ''
//      },
//      website:{
//       type: String,
//       default: ''
//      },
//      telegram:{
//       type: String,
//       default:''
//      },
//      addedAt:{
//       type: Date
//      },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   },
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

// ProductSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'product',
//   justOne: false,
// });

// ProductSchema.pre('remove', async function (next) {
//   await this.model('Review').deleteMany({ product: this._id });
// });

// module.exports = mongoose.model('Product', ProductSchema);
