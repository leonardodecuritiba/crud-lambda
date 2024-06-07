// Instanciando a biblioteca da aws para utilização do serviço do DynamoDB
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()

//Definindo a função que irá receber a requisição HTTP
exports.handler = async (data) => {
	// Verificar se há entrada na requisição
	if (!data) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'Entrada inválida',
			}),
		}
	}

	//Defindo os parametros para o DynamoDB
	const params = {
		TableName: 'Items',
		Key: {
			uuid: data.uuid,
		},
	}

	//submetendo os parâmetros ao DynamoDB
	try {
		await dynamo.delete(params).promise()
		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Pix cancelado com sucesso!' }),
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error.message }),
		}
	}
}
