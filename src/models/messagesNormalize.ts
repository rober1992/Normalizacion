import { mensajes } from "./messagesModels";
import { normalize, schema, denormalize } from "normalizr";
import { Messages } from "../interfaces/messagesInterface";

const author = new schema.Entity('author',{}, {idAttribute : 'email'});

const msg = new schema.Entity(
    'message',
    {
        author : author
    },
    { idAttribute : '_id'}
);

const msgesSchema = new schema.Array(msg);

export const getMessages = async () => {
    try {
        let messages = (await mensajes.find()).map((aMsg : any) => ({
            _id: aMsg._id,
            author: aMsg.author,
            text: aMsg.msg,
        }));

        let normalizedData = normalize(messages, msgesSchema);

        return normalizedData;
    } catch (err) {
        console.log(err);
        console.log('ERROR')
    }
}

export const addMessages = async (newMsg : Messages) => {
    console.log(newMsg);
    let messageToSave = new mensajes(newMsg);
    let savedMessage = await messageToSave.save();
    return savedMessage;
}