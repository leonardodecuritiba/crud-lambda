// Instanciando a biblioteca da aws para utilização do serviço do DynamoDB
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')
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

	// Gerar um UUID para o novo item
	const uuid = uuidv4()

	// Parâmetros para a operação de inserção no DynamoDB
	const params = {
		TableName: 'Items',
		Item: {
			uuid: uuid,
			sender: data.sender,
			receipt: data.receipt,
			value: data.value,
			description: data.description,
		},
	}

	//submetendo os parâmetros ao dynamo
	try {
		await dynamo.put(params).promise()
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'PIX enviado com sucesso!',
				uuid: uuid,
			}),
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error.message }),
		}
	}
}
