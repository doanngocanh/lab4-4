const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Cho phép tất cả các nguồn gốc
        "Access-Control-Allow-Headers": "Content-Type"
    };

    try {
        const { id, name } = JSON.parse(event.body);

        if (!id || !name) {
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({ message: "Missing required fields" }),
            };
        }

        const params = {
            TableName: 'AnhUser', // Tên bảng cố định
            Item: { id, name }
        };

        await dynamoDb.put(params).promise();

        return {
            statusCode: 201,
            headers: headers,
            body: JSON.stringify({ "name": name }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ message: "Internal server errorrrr" }),
        };
    }
};
