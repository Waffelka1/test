export function createtitle(title){
    const h1 = document.createElement("h1")
    h1.textContent = title
    h1.className = "title"
    return h1
}