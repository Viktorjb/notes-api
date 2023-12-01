const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const middy = require('@middy/core');
const { validateToken } = require('../middleware/auth');
const { nanoid } = require('nanoid');
const db = new AWS.DynamoDB.DocumentClient();


const postNote = async (event, context) => {

    if (event?.error && event?.error === '401'){
        return sendResponse(401, {success: false, message: 'invalid token'});
    }


    const note = JSON.parse(event.body)

    if (note.title.length > 50){
        return sendResponse(400, {success: false, message: 'Title too long'});
    }

    if (note.text.length > 300){
        return sendResponse(400, {success: false, message: 'Text too long'});
    }

    const timestamp = new Date().getTime();

    note.id = nanoid();
    note.createdAt = 'Created at: ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
    note.modifiedAt = 'Never modified';
    note.user = event.username;


    try{
        await db.put({
            TableName: 'notes-db',
            Item: note
        }).promise()

        return sendResponse(200, {success: true});
    } catch (error) {
        return sendResponse(500, {success: false});
    }
}

const handler = middy(postNote).use(validateToken)

module.exports = {handler};