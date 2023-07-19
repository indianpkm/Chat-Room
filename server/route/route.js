import express from "express";
import { addUSer, getUser } from "../controller/user_controller.js";
import { getConversation, newConversation } from "../controller/conversation_controller.js";
import { getMessage, newMessage } from "../controller/message_controller.js";

const route=express.Router();

route.post('/add',addUSer)
route.get('/getUser',getUser)

route.post('/conversation/add',newConversation)
route.post('/conversation/get',getConversation)


route.post('/message/add',newMessage)
route.get('/message/get/:id',getMessage)

export default route