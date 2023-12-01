const { sendResponse } = require('../../responses/index');
const AWS = require('aws-sdk');
const { validateToken } = require('../middleware/auth');
const middy = require('@middy/core');
const db = new AWS.DynamoDB.DocumentClient();


const getNotes = async (event, context) => {


    try{
        if (event?.error && event?.error === '401'){
            return sendResponse(401, {success: false, message: 'invalid token'});
        }

        currentUser = event.username;

        //Next and final? step. Filter by usernaem = event.username here. And in updatenote and in removenote, check if the username is the same as the note
    
        const {Items} = await db.scan({
            TableName: 'notes-db',
            FilterExpression : "#usr = :user",
            ExpressionAttributeNames: {"#usr": "user" },
            ExpressionAttributeValues: {
                ':user': currentUser
            }
        }).promise();

        return sendResponse(200, {success: true, notes: Items});
    } catch (error){
        return sendResponse(500, {success: false, message: error});
    }


}

const handler = middy(getNotes).use(validateToken)


module.exports = {handler};