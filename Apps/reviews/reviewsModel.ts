import { Schema, model } from 'mongoose';
import { Reviews } from './reviewsInterface';
import productModel from '../products/productModel';
import reviewsModel from './reviewsModel'; // Import the model explicitly if needed

const reviewsSchema: Schema = new Schema<Reviews>({
  comment: { type: String, required: true, trim: true },
  rate: { type: Number, required: true, min: 1, max: 5 },
  product: { type: Schema.Types.ObjectId, ref: 'products' },
  user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true });

reviewsSchema.statics.calcRatingAndQuantity = async function (productId: Schema.Types.ObjectId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: 'product', avgRating: { $avg: '$rate' }, ratingQuantity: { $sum: 1 } } }
  ]);
  if (result.length > 0) {
    await productModel.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRating,
      ratingCount: result[0].ratingQuantity
    })
  } else {
    await productModel.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingCount: 0
    })
  }
};

reviewsSchema.post<Reviews>('findOneAndDelete', async function (doc: Reviews) {
  if (doc && doc.product) {
    await (reviewsModel as any).calcRatingAndQuantity(doc.product);
  }
});

reviewsSchema.post<Reviews>('save', async function () { await (this.constructor as any).calcRatingAndQuantity(this.product) })

reviewsSchema.pre<Reviews>(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name image' })
  next();
})

reviewsSchema.pre<Reviews>('find', function (next) {
  this.populate({ path: 'product', select: 'name cover' })
  next();
})

export default model<Reviews>('reviews', reviewsSchema)