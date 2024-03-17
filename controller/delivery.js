const Delivery = require('../model/delivery')
const { StatusCodes } = require("http-status-codes");

//function to filter empty strings in the body
function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).
      filter(([key, val]) => callback(val, key)));
  }

const createDelivery = async (req, res) => {
    const {productName, description, recipientName, recipientNumber, deliveryStatus, deliveryDate, destinationAddress} = req.body;
    const trackingID = Math.floor(100000 + Math.random() * 900000);
    const delivery = await Delivery.findOne({trackingID})
    if(delivery){
        createDelivery()
    }
    const body = {trackingID, productName, description, recipientName, recipientNumber, deliveryStatus, deliveryDate, destinationAddress}
    Delivery.create(body).then((response, err) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({err})
        }else{
            return res.status(StatusCodes.ACCEPTED).json({response})
        }
    })
}
const deleteDelivery = async (req, res) => {
    const {deliveryId} = req.params

    const delivery = await Delivery.findOneAndDelete({_id: deliveryId})

    if(delivery){
        return res.status(StatusCodes.ACCEPTED).json({message: `delivery has been deleted succcessfully`})
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({message: "no delivery found"})
    }

}
const getDelivery = async (req, res) => {

    const delivery = await Delivery.find()

    if(delivery.length > 0) {
        return res.status(StatusCodes.ACCEPTED).json({delivery})
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({message: "no saved delivery for this user."})
    }
}
const getDeliveryByTrackingId = async (req, res) => {
    const {trackingID} = req.params

    const delivery = await Delivery.find({trackingID})

    if(delivery.length > 0) {
        return res.status(StatusCodes.ACCEPTED).json({delivery})
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({message: "no saved delivery with this tracking ID."})
    }
}
const updateDelivery = async (req, res) => {
    const body = req.body
    const {deliveryId} = req.params
    const exist = await Delivery.findOne({_id: deliveryId})

    var filteredBody =  filterObject(body, key => key != "")

    if (exist) {
        const delivery = await Delivery.findOneAndUpdate({_id: deliveryId}, filteredBody)
        
        if (delivery) {
            return res.status(StatusCodes.ACCEPTED).json({message: `Delivery has been updated successfully`})
        }else{
        return res.status(StatusCodes.BAD_REQUEST).json({message: `Delivery update failed`})
    }
    }
}

module.exports = {createDelivery, getDelivery, getDeliveryByTrackingId, deleteDelivery, updateDelivery}