import { myContract } from "./contract.js";
export async function ConfirmTransact(id,codeword){
    const send = myContract.methods.confirmTransfer(id,codeword).send()
    return send
}