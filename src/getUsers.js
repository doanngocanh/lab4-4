const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
  };

  const data = await dynamoDB.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data.Items)
  };
};
 
