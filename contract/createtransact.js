import { myContract } from "./contract.js"
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
export async function createtransact(accountsender,sum,recipient,codeword){
	const select = document.querySelector(".autor").value
	const send = await myContract.methods.createTransfer(recipient,web3.utils.asciiToHex(codeword)).send({from: select })
	console.log(send)
	return send
}