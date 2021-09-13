var image = [document.getElementById('1'),document.getElementById('2'),document.getElementById('3'),document.getElementById('4')]
let bests = []
var index_first = 0

// Bests Movies
arrow_left = document.getElementById('arrow-left-best')
arrow_right = document.getElementById('arrow-right-best')

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
                    image[i].src = bests[img_index]
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

