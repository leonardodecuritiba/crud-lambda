// Instanciando a biblioteca da aws para utilização do serviço do DynamoDB
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()

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
		UpdateExpression:
			'set sender = :sender, receipt = :receipt, #val = :value, description = :description',
		ExpressionAttributeNames: {
			'#val': 'value',
		},
		ExpressionAttributeValues: {
			':sender': data.sender,
			':receipt': data.receipt,
			':value': data.value,
			':description': data.description,
		},
	}

	//submetendo os parâmetros ao DynamoDB
	try {
		await dynamo.update(params).promise()
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Pix atualizado com sucesso!',
				data: data,
			}),
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error.message }),
		}
	}
}
