var image_best = [document.getElementById('1'),document.getElementById('2'),document.getElementById('3'),document.getElementById('4')]
var image_action = [document.getElementById('5'),document.getElementById('6'),document.getElementById('7'),document.getElementById('8')]
let bests = []
let action = []
var index_first = 0
var index_action = 0


// Bests Movies and first
arrow_left = document.getElementById('arrow-left-best')
arrow_right = document.getElementById('arrow-right-best')

fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score`)
    .then(reponse => reponse.json())
    .then(data => {

        //First Movie
        const titre = document.getElementById('titre')
        const resume = document.getElementById('resume')
        const img = document.getElementById('res')
        img.src = data.results[0].image_url
        titre.innerHTML = data.results[0].title

        fetch(data.results[0].url)
            .then(rep => rep.json())
            .then(dat => {
                resume.innerHTML = dat.description
            })

        //Best Movies
        for (let i = 1; i < 5; i++) {
            bests.push(data.results[i].image_url)}
        })
    .then(next => {
        fetch(`http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score`)
        .then(reponse => reponse.json())
        .then(data => {
            for (let i = 0; i < 3; i++) {
            bests.push(data.results[i].image_url)}
    })
        .then(func => {
            function change_movies(index_first){
                if (index_first >= 4 )
                {
                    index_first = 3
                }
                if (index_first <= 0){
                    index_first = 0
                }
                i = 0
                for (let img_index = index_first; img_index < index_first + 4;img_index++){
                    image_best[i].src = bests[img_index]
                    i += 1
                }
            }
            function go_left() {
                if (index_first != 0) {
                    index_first -= 1
                }
                change_movies(index_first)
            }
            function go_right() {
                if (index_first != 3) {
                    index_first += 1
                }
                change_movies(index_first)
            }
            change_movies(index_first)
            arrow_left.onclick = go_left
            arrow_right.onclick = go_right
        })
    })

//Action Movies

arrow_left_action = document.getElementById('arrow-left-action')
arrow_right_action = document.getElementById('arrow-right-action')

fetch(`http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score`)
    .then(reponse => reponse.json())
    .then(data => {

        //Action Movies
        for (let i = 0; i < 5; i++) {
            action.push(data.results[i].image_url)}
        })
    .then(next => {
        fetch("http://localhost:8000/api/v1/titles/?genre=action&page=2&sort_by=-imdb_score")
        .then(reponse => reponse.json())
        .then(data => {
            for (let i = 0; i < 2; i++) {
            action.push(data.results[i].image_url)}
    })
        .then(func => {
            function change_movies(index_action){
                if (index_action >= 4 )
                {
                    index_action = 3
                }
                if (index_action <= 0){
                    index_action = 0
                }
                i = 0
                for (let img_index = index_action; img_index < index_action + 4;img_index++){
                    image_action[i].src = action[img_index]
                    i += 1
                }
            }
            function go_left() {
                if (index_action != 0) {
                    index_action -= 1
                }
                change_movies(index_action)
            }
            function go_right() {
                if (index_action != 3) {
                    index_action += 1
                }
                change_movies(index_action)
            }
            change_movies(index_action)
            arrow_left_action.onclick = go_left
            arrow_right_action.onclick = go_right
        })
    })