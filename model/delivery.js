const mongoose = require('mongoose')


const deliverySchema = new mongoose.Schema({
    trackingID: { type: String },
    productName: { type: String },
    recipientName: { type: String },
    recipientNumber: { type: String },
    description: { type: String },
    destinationAddress: {type: String},
    deliveryStatus: { type: Number, default: 0 },
    deliveryDate: { type: Date },
}, { timestamps: true })


module.exports = mongoose.model('Delivery', deliverySchema);