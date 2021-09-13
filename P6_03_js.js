var image_best = [document.getElementById('1'),document.getElementById('2'),document.getElementById('3'),document.getElementById('4')]
let bests = []
let bests_title = []
var index_first = 0

//Action
var image_action = [document.getElementById('5'),document.getElementById('6'),document.getElementById('7'),document.getElementById('8')]
let action = []
var index_action = 0
arrow_left_action = document.getElementById('arrow-left-action')
arrow_right_action = document.getElementById('arrow-right-action')
let action_array = [action,image_action,index_action,arrow_left_action,arrow_right_action,`http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score`,"http://localhost:8000/api/v1/titles/?genre=action&page=2&sort_by=-imdb_score"]

//Animation
var image_animation = [document.getElementById('9'),document.getElementById('10'),document.getElementById('11'),document.getElementById('12')]
let animation = []
var index_animation = 0
arrow_left_animation = document.getElementById('arrow-left-animation')
arrow_right_animation = document.getElementById('arrow-right-animation')
let animation_array = [animation,image_animation,index_animation,arrow_left_animation,arrow_right_animation,`http://localhost:8000/api/v1/titles/?genre=animation&sort_by=-imdb_score`,"http://localhost:8000/api/v1/titles/?genre=animation&page=2&sort_by=-imdb_score"]

//Thriller
var image_thriller = [document.getElementById('13'),document.getElementById('14'),document.getElementById('15'),document.getElementById('16')]
let thriller = []
var index_thriller = 0
arrow_left_thriller = document.getElementById('arrow-left-thriller')
arrow_right_thriller = document.getElementById('arrow-right-thriller')
let thriller_array = [thriller,image_thriller,index_thriller,arrow_left_thriller,arrow_right_thriller,'http://localhost:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score',"http://localhost:8000/api/v1/titles/?genre=thriller&page=2&sort_by=-imdb_score"]


let movies = [action_array,animation_array,thriller_array]


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
            bests.push(data.results[i].image_url)
            bests_title.push(data.results[i].title)}
        })
    .then(next => {
        fetch(`http://127.0.0.1:8000/api/v1/titles/?page=2&sort_by=-imdb_score`)
        .then(reponse => reponse.json())
        .then(data => {
            for (let i = 0; i < 3; i++) {
            bests.push(data.results[i].image_url)
            bests_title.push(data.results[i].title)}
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
                    image_best[i].setAttribute('url',bests[img_index])
                    image_best[i].setAttribute('index',i+index_first)
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
            for (let i = 0; i < image_best.length;i++){
                image_best[i].addEventListener('click',function(){
                    fetch(`http://127.0.0.1:8000/api/v1/titles/?title=${bests_title[image_best[i].getAttribute('index')]}`)
                    .then(reponse => reponse.json())
                    .then(ans => {
                        console.log(ans.results[0].url)


                    })
                })
            }
        })
    })

//Movies

for (let m = 0; m < 3; m++)
{
    let array_mov = movies[m]
    fetch(array_mov[5])
        .then(reponse => reponse.json())
        .then(data => {

            for (let i = 0; i < 5; i++) {
                array_mov[0].push(data.results[i].image_url)}
            })
        .then(next => {
        fetch(array_mov[6])
            .then(reponse => reponse.json())
            .then(data => {
                for (let i = 0; i < 2; i++) {
                array_mov[0].push(data.results[i].image_url)}
        })
            .then(func => {
                function change_movies(array_mov){
                    if (array_mov[2] >= 4 )
                    {
                        array_mov[2] = 3
                    }
                    if (array_mov[2] <= 0){
                        array_mov[2] = 0
                    }
                    i = 0
                    for (let img_index = array_mov[2]; img_index < array_mov[2] + 4;img_index++){
                        array_mov[1][i].src = array_mov[0][img_index]
                        i += 1
                    }
                }
                function go_left() {
                    if (array_mov[2] != 0) {
                        array_mov[2] -= 1
                    }
                    change_movies(array_mov)
                }
                function go_right() {
                    if (array_mov[2] != 3) {
                        array_mov[2] += 1
                    }
                    change_movies(array_mov)
                }
                change_movies(array_mov)
                array_mov[3].onclick = go_left
                array_mov[4].onclick = go_right
            })
        })

}
