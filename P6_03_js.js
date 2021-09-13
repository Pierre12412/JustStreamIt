var image = document.getElementById('1')
let bests = []

// Bests Movies
arrow_left = document.getElementsById('arrow-left-best')
arrow_right = document.getElementsById('arrow-right-best')

fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score`)
    .then(reponse => reponse.json())
    .then(data => {
        for (let i = 0; i < 5; i++) {
            bests.push(data.results[i].image_url)}
        })
    .then(next => {
        fetch(`http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score`)
        .then(reponse => reponse.json())
        .then(data => {
            for (let i = 0; i < 2; i++) {
            bests.push(data.results[i].image_url)}
    })
        .then(func => {
            for (let img_index = 0; img_index<4;img_index++){
                var image = document.getElementById(`${img_index + 1}`)
                image.src = bests[img_index]
            }  



        })
    })

