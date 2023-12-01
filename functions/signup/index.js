const { sendResponse } = require("../../responses");
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');
const { nanoid } = require("nanoid");
const db = new AWS.DynamoDB.DocumentClient();

async function createAccount(username, hashedPassword, userId) {

    try {
        await db.put({
            TableName: 'users',
            Item: {
                username: username,
                password: hashedPassword,
                userId: userId
            }

        }).promise();

        return {success: true, userId: userId};
    } catch (error) {
        return {success: false, message: 'Failed to create account'};

    }

}




async function signup(username, password) {

    // check if username already exists
    // if so return false

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid();

    const result = await createAccount(username, hashedPassword, userId);
    return result;

}




exports.handler = async (event) => {
    const {username, password} = JSON.parse(event.body);

    const result = await signup(username, password);

    if (result.success){
        return sendResponse(200, result);
    }
    else{
        return sendResponse(400, result);
    }
    return sendResponse()


}