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
import { createtransactionbutton } from "./Modules/createtransactionbutton.js"
// import { getaccs } from "./contract/getAcc.js"

import { myContract } from "./contract/contract.js"



const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
// console.log(getaccs())
async function createautorisation(){
    let accounts = await web3.eth.getAccounts()
    const conf = createInput()
    conf.placeholder= "Введите номер транзакции"
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
    const backbtn = backbutton()
    backbtn.hidden = true
    formmain.append(backbtn)
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
    const sum = createInput()
    sum.placeholder = "Введите сумму"
    const contar = createContainer()
    formmain.append(contar)
    transactcont.append(sum)
    transactcont.append(select2)
    transactcont.append(transbtn)
    const contcan = createContainer()
    contcan.className = "cansel"
    const codew2 = createInput()
    const conftitle = createtitle("Подтвердите перевод")
    const canbtn = createtransactionbutton()
    canbtn.textContent = "Отменить"
    const h4 = createtitle("Отмена перевода")
    contar.append(conftitle,conf,codew2,acceptbtn)
    const cansel = createInput()
    cansel.placeholder = "Введите номер транзакции"
    formmain.append(contcan)
    contcan.append(h4,cansel,canbtn)
    const historyform = createForm()
    const h2 = createname()
    containermain.append(h2)
    const h3 = createname()
    containermain.append(h3)
    formmain.type = "submit"
    word.type = "password"
    codew2.type = "password"
    sum.type = "number"
    const historytitle = createtitle("Исходящие переводов")
    const formsend = createForm()
    const sendtitle = createtitle("Входящие переводы")
    contar.append(sendtitle,formsend)



    enterbutton.addEventListener("click",async function(e){
        e.preventDefault()
        if(select.value == "Выберите аккаунт"){
            alert("Выберите аккаунт!")
        }
        else{

            backbtn.hidden = false
            form.hidden = true
            formmain.hidden = false
            const valuemain = select.value
  
            h2.textContent = `Ваш аккаунт: ${valuemain}`
            const bal = await web3.eth.getBalance(valuemain)
            const balance = await web3.utils.fromWei(bal, "ether")
			h3.textContent = `Ваш баланс составляет: ${balance} eth`
            select2.hidden = false
            let transct = await myContract.methods.nextId().call() - 1
            for(let i = 1;i<=transct;i++){
                const transfer = await myContract.methods.transfers(i).call()
                const historydivs1 = createContainer()
                historydivs1.className = "rec"
                if(transfer.recipient === valuemain){
                    historydivs1.textContent = `Перевод от ${transfer.sender}: номер транзакции: ${i}:${transfer.recipient} сумма:${web3.utils.fromWei(transfer.amount,"ether")} ETH `
                    formsend.append(historydivs1)
                    if(transfer.isConfirmed == true){
                        historydivs1.style.backgroundColor = "green"
                    }
                    if(transfer.isCancelled == true){
                        historydivs1.style.backgroundColor = "red"
                    }
                }}
            for(let i = 1;i<=transct;i++){
                const transfer = await myContract.methods.transfers(i).call()
                const historydivs = createContainer()
                historydivs.className = "sen"
                if(transfer.sender === valuemain){
                historydivs.textContent = `Перевод от ${transfer.sender}: номер транзакции: ${i}:${transfer.recipient} сумма:${web3.utils.fromWei(transfer.amount,"ether")} ETH `
                historyform.append(historydivs)
                if(transfer.isConfirmed == true){
                    historydivs.style.backgroundColor = "green"
                }
                if(transfer.isCancelled == true){
                    historydivs.style.backgroundColor = "red"
                }
                }
            }
            
            transbtn.addEventListener("click",async function(e){
                e.preventDefault()
                try{
                if(select.value == select2.value){
                    alert("Нельзя перевести самому себе")
                }
                else if(word.value == "" || sum.value == ""){
                    alert ("Поле не заполненно")
                }

                else{
                let transct = await myContract.methods.nextId().call() - 1
                let transct1 = await myContract.methods.nextId().call()
                const codew = word.value
                const recipient = document.querySelector(".autor").value
                console.log(recipient)
                const send = await myContract.methods.createTransfer(recipient,web3.utils.asciiToHex(codew)).send({from: valuemain, value: web3.utils.toWei(sum.value,"ether"), gas: 200000 })
                console.log(send)
                word.value = ""
                sum.value = ""
                const bal = await web3.eth.getBalance(valuemain)
                const balance = await web3.utils.fromWei(bal, "ether")
                h3.textContent = `Ваш баланс составляет ${balance}`
                const transfer = await myContract.methods.transfers(transct1).call()
                const historydivs = createContainer()
                historydivs.textContent = `Перевод от ${valuemain}: номер транзакции: ${transct1}:${transfer.recipient} сумма:${web3.utils.fromWei(transfer.amount,"ether")} ETH `
                historyform.append(historydivs)
                alert(`Перевод отправлен!`)
                }
                
                }
                catch (error) {
                    console.error(error);
                    alert("Ошибка при создании перевода")

                }
            })


            acceptbtn.addEventListener("click", async function(e){
                e.preventDefault()

                if(codew2 == ""){
                    alert("Введите кодовое слово")
                }
                else{
                
                    try{
                    // let transct = await myContract.methods.nextId().call() - 1
                        let cod = codew2.value
                        let transct1 = await myContract.methods.nextId().call() - 1
                        const send1 = await myContract.methods.confirmTransfer(transct,web3.utils.asciiToHex(cod)).send({from: valuemain})
                        console.log(send1)
                        codew2.value = ""
                        conf.value = ""
                        const bal = await web3.eth.getBalance(valuemain)
                        const balance = await web3.utils.fromWei(bal, "ether")
                        h3.textContent = `Ваш баланс составляет ${balance}`
                        const transfer = await myContract.methods.transfers(transct1).call()
                        const ter = await web3.utils.hexToUtf8(transfer.codeWord)
                        console.log(ter)
                        console.log(transfer.codeWord)
                        console.log(transfer.isCancelled)
                        if(cod != ter )
                        {
                            alert("Перевод отменён")
                        }
                        else{
                            alert("Перевод подтверждён")
                        }
                }
                catch (error) {
                    console.error(error);
                    alert("Ошибка при подтверждении")
            }
}})
                canbtn.addEventListener("click",async function(e){
                   try{ e.preventDefault()
                    let transct = await myContract.methods.nextId().call() - 1
                    const transfer = await myContract.methods.transfers(transct).call()
                    const send12 = await myContract.methods.cancelTransfer(cansel.value).send({from: transfer.sender})
                    console.log(send12)
                    cansel.value = ""
                    const bal = await web3.eth.getBalance(valuemain)
                    const balance = await web3.utils.fromWei(bal, "ether")
                    h3.textContent = `Ваш баланс составляет ${balance}`
                    alert("Перевод отменён!")
        }
        catch (error) {
            console.error(error);
            alert("Ошибка при отмене перевода")}
			return valuemain
        })
		// return valuemain
    }})


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
    formmain.append(historytitle)
    formmain.append(historyform)


}


document.addEventListener("DOMContentLoaded",createautorisation)