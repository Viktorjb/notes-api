const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const middy = require('@middy/core');
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();

const removeNote = async (event, context) => {

    if (event?.error && event?.error === '401'){
        return sendResponse(401, {success: false, message: 'invalid token'});
    }

    const { noteId } = event.pathParameters;
    
    try{
        await db.delete({
            TableName: 'notes-db',
            Key : { id: noteId }
        }).promise();

        return sendResponse(200, {success: true});
    } catch (error){
        return sendResponse(500, {success: false, message: 'Could not delete note'});
    }

}

const handler = middy(removeNote).use(validateToken)

module.exports = {handler};