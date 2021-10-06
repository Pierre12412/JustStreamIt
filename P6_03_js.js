const popup = document.getElementById("popup")
const blur = document.getElementById("blur")
const body = document.getElementsByTagName('body')


//--------------------------------------------------Best--------------------------------------------------
let image_best = [document.getElementById('1'),document.getElementById('2'),document.getElementById('3'),document.getElementById('4')]

arrow_left_best = document.getElementById('arrow-left-best')
arrow_right_best = document.getElementById('arrow-right-best')

let best_array = [image_best,arrow_left_best,arrow_right_best,
`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`,
"http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score"]

//--------------------------------------------------Action--------------------------------------------------
let image_action = [document.getElementById('5'),document.getElementById('6'),document.getElementById('7'),document.getElementById('8')]

arrow_left_action = document.getElementById('arrow-left-action')
arrow_right_action = document.getElementById('arrow-right-action')

let action_array = [image_action,arrow_left_action,arrow_right_action,
`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score`,
"http://localhost:8000/api/v1/titles/?genre=action&page=2&sort_by=-imdb_score"]

//--------------------------------------------------Animation--------------------------------------------------
let image_animation = [document.getElementById('9'),document.getElementById('10'),document.getElementById('11'),document.getElementById('12')]

arrow_left_animation = document.getElementById('arrow-left-animation')
arrow_right_animation = document.getElementById('arrow-right-animation')

let animation_array = [image_animation,arrow_left_animation,arrow_right_animation,
`http://localhost:8000/api/v1/titles/?genre=animation&sort_by=-imdb_score`,
"http://localhost:8000/api/v1/titles/?genre=animation&page=2&sort_by=-imdb_score"]

//--------------------------------------------------Thriller--------------------------------------------------
let image_thriller = [document.getElementById('13'),document.getElementById('14'),document.getElementById('15'),document.getElementById('16')]

arrow_left_thriller = document.getElementById('arrow-left-thriller')
arrow_right_thriller = document.getElementById('arrow-right-thriller')

let thriller_array = [image_thriller,arrow_left_thriller,arrow_right_thriller,
'http://localhost:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score',
"http://localhost:8000/api/v1/titles/?genre=thriller&page=2&sort_by=-imdb_score"]


let movies = [action_array,animation_array,thriller_array,best_array]

fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score`)
    .then(reponse => reponse.json())
    .then(data => {

        //First Movie
        const titre = document.getElementById('titre')
        const resume = document.getElementById('resume')
        const img = document.getElementById('res')
        img.src = data.results[0].image_url
        titre.innerHTML = data.results[0].title
        first = data.results[0]
        document.getElementById('res').addEventListener('click',function(){
            fetch(first.url)
                .then(re => re.json())
                .then(ans => {
                     popup_display()
                    const movie = ans
                    display_informations(movie)
                })
        })

        fetch(data.results[0].url)
            .then(rep => rep.json())
            .then(dat => {
                resume.innerHTML = dat.description
            })})

//Movies

for (let m = 0; m < 4; m++)
{
    let array_mov = movies[m]

    // Reminder :
    //      - array_mov[0] --> image places in html
    //      - array_mov[1] --> arrow_left
    //      - array_mov[2] --> arrow_right
    //      - array_mov[3] --> first page of category
    //      - array_mov[4] --> second page of category

    let titles = []
    let images_from_api = []
    let index = 0
    let image_places = array_mov[0]
    let arrow_left = array_mov[1]
    let arrow_right = array_mov[2]
    let first_page = array_mov[3]
    let second_page = array_mov[4]
    

    fetch(first_page)
        .then(reponse => reponse.json())
        .then(data => {
            if (m == 3){

                // Remove first movie from bests (already shown)
                for (let i = 1; i < 5; i++) {
                images_from_api.push(data.results[i].image_url)
                titles.push(data.results[i].title)}
                fetch(second_page)
                    .then(reponse => reponse.json())
                    .then(second_page_data => {
                        for (let i = 0; i < 3; i++) {
                            images_from_api.push(second_page_data.results[i].image_url)
                            titles.push(second_page_data.results[i].title)}
                        })

                }

            else{
                for (let i = 0; i < 5; i++) {
                images_from_api.push(data.results[i].image_url)
                titles.push(data.results[i].title)}
            }})
            
        .then(next => {
        fetch(second_page)
            .then(reponse => reponse.json())
            .then(data => {
                for (let i = 0; i < 2; i++) {
                images_from_api.push(data.results[i].image_url)
                titles.push(data.results[i].title)}
        })
            .then(func => {

                // ------------------Functions to go left and right in sections ------------------

                function change_movies(index,image_places,images_from_api){
                    if (index >= 4 )
                    {
                        index = 3
                    }
                    if (index <= 0){
                        index = 0
                    }
                    let i = 0
                    for (let img_index = index; img_index < index + 4;img_index++){
                        image_places[i].src = images_from_api[img_index]
                        image_places[i].setAttribute('url',images_from_api[img_index])
                        image_places[i].setAttribute('index',i+index)
                        i += 1
                    }
                }

                change_movies(index,image_places,images_from_api)
                arrow_left.addEventListener('click', () => {
                    if (index != 0) {
                        index -= 1
                    }
                    change_movies(index,image_places,images_from_api)
                })
                arrow_right.addEventListener('click', () => {
                    if (index != 3) {
                        index += 1
                    }
                    change_movies(index,image_places,images_from_api)
                })
                for (let i = 0; i < image_places.length;i++){
                    const display = image_places[i]
                    display.addEventListener('click',() => {
                        fetch(`http://127.0.0.1:8000/api/v1/titles/?title=${titles[image_places[i].getAttribute('index')]}`)
                        .then(reponse => reponse.json())
                        .then(answ => {
                            fetch(answ.results[0].url)
                            .then(res => res.json())
                            .then(dat => {
                                popup_display()
                                const movie = dat
                                display_informations(movie)
                                
                            })

                        })
                    })
                }
                
            })
        })

}


//--------------------------------- Popup -------------------------------------------------

// Convert movie time to hours
function convertMinsToHrsMin(minutes) {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  h = h < 10 ?  h : h;
  m = m < 10 ? '0' + m : m;
  return h + 'h' + m;
}

// Show Popup
function popup_display(){
    body[0].style.overflow = "hidden"
    blur.style.top = window.scrollY
    popup.style.top = window.scrollY
    popup.style.visibility = "visible"
    blur.style.visibility = "visible"
}

// Close Popup
document.getElementById('close').addEventListener('click',function(){
    popup.style.visibility = 'hidden'
    blur.style.visibility = 'hidden'
    body[0].style.overflow = 'scroll'
})

// Show informations of movie in Popup
function display_informations(movie){
    document.getElementById('selection_title').innerHTML = movie.title
    document.getElementById('movie_image').src = movie.image_url
    let all = ''
    for (let ind = 0; ind < movie.genres.length; ind+=1){
        all += movie.genres[ind] + ' '
    }
    document.getElementById('genre').innerHTML = all
    document.getElementById('date').innerHTML = movie.date_published
    document.getElementById('imdb').innerHTML = 'Score Imdb : ' + movie.imdb_score
    document.getElementById('rated').innerHTML = 'Rating : ' + movie.rated
    let realisators = ''
    for (let ind = 0; ind < movie.directors.length; ind+=1){
        realisators += movie.directors[ind] + ' '
    }
    document.getElementById('real').innerHTML = 'Réalisateur(s) : ' + realisators
    let actors = ''
    for (let ind = 0; ind < movie.actors.length; ind+=1){
        actors += movie.actors[ind]
        if (movie.actors[ind+1] != null){
            actors += ' / '
        }
    }
    document.getElementById('actors').innerHTML = 'Acteurs : ' + actors
    document.getElementById('duration').innerHTML = 'Durée : ' + convertMinsToHrsMin(movie.duration)
    let countries = ''
    for (let ind = 0; ind < movie.countries.length; ind+=1){
        countries += movie.countries[ind]
        if (movie.countries[ind+1] != null){
            countries += ' / '
        }
    }
    document.getElementById('countries').innerHTML = 'Pays : ' + countries
    if (movie.reviews_from_critics == null)
    {
        document.getElementById('boxoffice').innerHTML = 'Résultat Box Office : Aucune donnée'
    }else{
        document.getElementById('boxoffice').innerHTML = 'Résultat Box Office : ' + movie.reviews_from_critics
    }
    document.getElementById('resume_popup').innerHTML = "Résumé :<br /><br />" + movie.description

}
//-----------------------------------------------------------------------------------------------------