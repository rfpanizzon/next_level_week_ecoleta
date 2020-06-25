//pra pegar o botão
const buttonSerach = document.querySelector("#page-home main a") //page home procura dentro do main o seu a
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSerach.addEventListener("click", () => {
    modal.classList.remove("hide") //vai remover a class hide pra mostrar a outra tela
})

close.addEventListener("click", () => {
    modal.classList.add("hide") //adiciona o hide pra desaparecer a tela
})