const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const middy = require('@middy/core');
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();


const updateNote = async (event, context) => {
    const {noteId} = event.pathParameters;
    const { text } = JSON.parse(event.body);

    if (event?.error && event?.error === '401'){
        return sendResponse(401, {success: false, message: 'invalid token'});
    }

    if (text.length > 300){
        return sendResponse(400, {success: false, message: 'Text too long'});
    }

    const modifiedString = 'Modified at: ' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();

    try {
        await db.update({
            TableName: 'notes-db',
            Key: { id: noteId },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #t = :value, #m = :modified',
            ConditionExpression: 'id = :noteId',
            ExpressionAttributeNames: {
                '#t' : 'text',
                '#m' : 'modifiedAt'
            },
            ExpressionAttributeValues: {
                ':value' : text,
                ':noteId' : noteId,
                ':modified' : modifiedString
            }
            
        }).promise();

        return sendResponse(200, {success: true});
    } catch (error) {
        return sendResponse(500, {success: false, message: error});
    }
    
}

const handler = middy(updateNote).use(validateToken)

module.exports = {handler};