const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { name } = JSON.parse(event.body);
  const id = uuidv4();

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id, name }
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ id, name })
  };
};

