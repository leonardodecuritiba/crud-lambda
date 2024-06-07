// Instanciando a biblioteca da aws para utilização do serviço do DynamoDB
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()

//Definindo a função que irá receber a requisição HTTP
exports.handler = async (data) => {
	//Defindo os parametros para o DynamoDB
	const params = {
		TableName: 'Items',
	}

	//submetendo os parâmetros ao DynamoDB
	try {
		const data = await dynamo.scan(params).promise()
		return {
			statusCode: 200,
			body: JSON.stringify(data.Items),
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error.message }),
		}
	}
}
