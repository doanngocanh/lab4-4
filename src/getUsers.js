const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    try {
        // Scan toàn bộ bảng để lấy tất cả các mục
        const params = {
            TableName: TABLE_NAME
        };

        const data = await dynamoDB.scan(params).promise();
        
        // Chỉ trả về danh sách các name
        const names = data.Items.map(item => ({
          id: item.id,
          name: item.name
      }));
        console.log (data.Items);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify(names),
        };

    } catch (error) {
        console.error("Error retrieving users:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Internal server error", error: error.message }),
        };
    }
};