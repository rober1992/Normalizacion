import mongoose from "mongoose";
import { Messages } from "../interfaces/messagesInterface";

const messagesCollection = 'messages';

const MessagesSchema = new mongoose.Schema(
    {
        author : {
            email : {type : String, required : true, max : 64},
            nombre : {type : String, required : true, max : 64},
            apellido : {type : String, required : true, max : 64},
            alias : {type : String, required : true, max : 64},
            edad : {type : Number, required : true},
            avatar : {type : String, require : true, max : 64}
        },
        msg : {type : String, require : true, min : 1},
        timestamp : {type : Number}
    },
    { versionKey : false }
);

export const mensajes = mongoose.model(messagesCollection, MessagesSchema);