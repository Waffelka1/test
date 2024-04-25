import { myContract } from "./contract.js";
export async function cancelTranser(){
    const send = await myContract.methods.cancelTranser(id).call()
    return send
}