export function createInput(){
    const input = document.createElement("input")
    input.className = "input"
	input.placeholder = "Введите кодовое слово"
    return input
}