import { createContainer } from "./Modules/createContainer.js"
import {createForm} from "./Modules/createForm.js"
import { createlists } from "./Modules/createLists.js"
import { createListElement } from "./Modules/createListElements.js"
import { createtitle } from "./Modules/createtitle.js"
import { createInput } from "./Modules/createInput.js"
import { createname } from "./Modules/createname.js"
import { backbutton } from "./Modules/backbutton.js"
import { enterButton } from "./Modules/enterbutton.js"
import { createtrans } from "./Modules/createtrans.js"
import { createtransact } from "./contract/createtransact.js"
import { createtransactionbutton } from "./Modules/createtransactionbutton.js"
import { ConfirmTransact } from "./contract/ConfirmTransact.js"
import { cancelTranser } from "./contract/CancelTransact.js"
import { myContract } from "./contract/contract.js"



const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

async function createautorisation(){
    let accounts = await web3.eth.getAccounts()
    console.log(accounts)
    const enterbutton = enterButton()
    const container = createContainer()
    const form = createForm()
    document.body.append(form)
    form.append(createtitle("Авторизуйтесь!"))
    form.append(container)
    const select = createlists()
    container.append(select)
    container.append(enterbutton)
    const formmain = createForm()
    formmain.hidden = true
    formmain.append(createtitle("Главное меню"))
    const containermain = createContainer()
    formmain.append(containermain)
    document.body.append(formmain)
	const title = createtrans()
	const word = createInput()
	formmain.append(title)
	const transactcont = createContainer()
	formmain.append(transactcont)
	transactcont.append(word)
    const transbtn = createtransactionbutton()  
    const select2 = createlists()  
    select2.className = "autor"
    select2.hidden = true
    const canselbtn = createtransactionbutton()
    const acceptbtn = createtransactionbutton()
    acceptbtn.textContent = "Подтвердить перевод"
    canselbtn.textContent = "Отменить перевод"
    formmain.append(select2)
    const sum = createInput()
    sum.placeholder = "Введите сумму"
    transactcont.append(transbtn)
    transactcont.append(sum)


    enterbutton.addEventListener("click",async function(e){
        e.preventDefault()
        if(select.value == "Выберите аккаунт"){
            alert("Выберите аккаунт!")
        }
        else{
            form.hidden = true
            formmain.hidden = false
            const valuemain = select.value
            const h2 = createname()
            h2.textContent = `Ваш аккаунт: ${valuemain}`
            containermain.append(h2)
			const bal = await web3.eth.getBalance(valuemain)
			const balance = await web3.utils.fromWei(bal, "ether")
			const h3 = createname()
			h3.textContent = `Ваш баланс составляет: ${balance} eth`
			containermain.append(h3)
            select2.hidden = false
            transbtn.addEventListener("click",async function(e){
                e.preventDefault()
                const codew = word.value
                const recipient = document.querySelector(".autor").value
                const send = await myContract.methods.createTransfer(recipient,web3.utils.asciiToHex(codew)).send({from: valuemain, value: web3.utils.toWei(sum.value,"ether"), gas: 200000 })
                console.log(send)
            
            })
            

			return valuemain
        }
		// return valuemain
    })


    const optionfalse = createListElement()
    const optionfalse2 = createListElement()
    optionfalse.textContent = "Выберите аккаунт"
    optionfalse2.textContent = "Выберите аккаунт"
    select.append(optionfalse)
    select2.append(optionfalse2)

    for(let acc of accounts){
        const option = createListElement()
        const option2 = createListElement()
        option.textContent = acc
        option2.textContent = acc
        select.append(option)
        select2.append(option2)
    }

}

document.addEventListener("DOMContentLoaded",createautorisation)