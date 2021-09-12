
const image = document.querySelector('#res')
var variable = 2000
var name_var = 'year'
fetch(`http://127.0.0.1:8000/api/v1/titles/${name_var}=${variable}`)
    .then(reponse => reponse.json())
    .then(data => {console.log(data)})

year = 2001
fetch(`http://127.0.0.1:8000/api/v1/titles/?year=${year}`)
    .then(reponse => reponse.json())
    .then(data => {console.log(data)})

