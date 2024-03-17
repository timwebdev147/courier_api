const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware");
const { getDeliveryByTrackingId, createDelivery, getDelivery, deleteDelivery, updateDelivery } = require("../controller/delivery");
const { signIn, signUp } = require("../controller/user");
// imported controllers



//User controller routes
router.route("/register").post(signUp );//create a user
router.route("/login").post( signIn );//create a user

//Delivery controller routes
router.route("/delivery").post(authorize, createDelivery)//create an delivery
router.route("/delivery/:trackingID").get(getDeliveryByTrackingId)//get delivery
router.route("/delivery").get(authorize, getDelivery)//get delivery
router.route("/delivery/:deliveryId").delete(authorize, deleteDelivery)//delete an delivery
router.route("/delivery/:deliveryId").put(authorize, updateDelivery)//modify an delivery




module.exports = router;