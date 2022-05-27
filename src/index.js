console.log('%c HI', 'color: firebrick')

function addImgTag(url){
    return `<img src='${url}'/>`
}
function addImg(jsonObj) {
    const imgContainer = document.getElementById('dog_image_container');
    const arrOfDogs = jsonObj.message;
    arrOfDogs.forEach(url => {
        imgContainer.innerHTML += addImgTag(url)
    })
}
function addLi(json){
    const listOfBreeds = document.getElementById('dog-breeds');
    const dogBreeds = Object.keys(json.message);
    dogBreeds.forEach(breed => {
    listOfBreeds.innerHTML += `<li>${breed}</li>`})
}
const changeColor = (e) => {
    e.target.style.color = 'pink'

}

//DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(addImg);   
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(addLi)

    //add event
    const listOfBreeds = document.getElementById('dog-breeds');
    listOfBreeds.addEventListener('click', changeColor)
    //dropdown
    //filter breeds
    const dropDown = document.querySelector('#breed-dropdown')
    dropDown.addEventListener('change', e => {
        fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(resp => {
            let dogBreeds = Object.keys(resp.message);
            let filteredDogBreeds = dogBreeds.filter(breed => {
                return breed.startsWith(e.target.value);
            })
            listOfBreeds.innerHTML = ''
            filteredDogBreeds.forEach((breed => {
            listOfBreeds.innerHTML += `<li>${breed}</li>`}))
        })
    })
})