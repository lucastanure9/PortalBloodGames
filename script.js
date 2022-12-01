let url = "https://api.rawg.io/api/games?key=0f6c2f332bc643a3b1ffb5d13f9bb003";
let video_url= "https://api.rawg.io/api/games/3498/movies?key=0f6c2f332bc643a3b1ffb5d13f9bb003";
let storesURL = "https://api.rawg.io/api/stores?key=0f6c2f332bc643a3b1ffb5d13f9bb003"
let plataformsURL = "https://api.rawg.io/api/platforms?key=0f6c2f332bc643a3b1ffb5d13f9bb003"
let developersURL = "https://api.rawg.io/api/developers?key=0f6c2f332bc643a3b1ffb5d13f9bb003"

const req = new XMLHttpRequest();

req.onreadystatechange = function(){
    if(req.readyState==4){
        atualizaDados(this.responseText);
    }
   
}

req.open("GET", url);
req.send();

function inserirDestaques(){
    const req2 = new XMLHttpRequest();
    let resultArray = []

    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let resposta = JSON.parse(this.responseText)
            let plat = document.querySelector("#destaques")

            for(let i = 0; i < 10; i++){
                resultArray[i] = resposta.results[i].id;
                plat.innerHTML += `
                <div class="mySlides">
                    <img style="width: 560px; height: 315px" src="${resposta.results[i].background_image}" alt="IMAGEM ${resposta.results[i].name}">
                    <div>
                        <p id="nomejogo"><strong>${resposta.results[i].name}</strong></p>
                        <div>
                            <p><strong>Data de Lançamento:</strong>${resposta.results[i].released}</p>
                        </div>
                        <p><strong>Gênero:</strong>${resposta.results[i].genres[0].name}</p>
                        <p><strong>Avaliação:</strong>${resposta.results[i].metacritic}</p>
                        <button><strong><p onclick=detalhes(${resposta.results[i].id})>Mais detalhes...</p></strong></button>
                    </div>
                </div>
                `
            }
            carousel();
            console.log(resultArray)
            inserirTrailers(resultArray);
        }
    }
    
    req2.open("GET", url);
    req2.send();
}

function inserirTrailers(gamesIDs){
    let index = 0;
    const req2 = new XMLHttpRequest();
    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let resposta = JSON.parse(this.responseText)
            let plat = document.querySelector("#trailers .cards")
            console.log(resposta);
            if(resposta.results.length > 0){
                for(let i = 0; i < 3; i++){
                    plat.innerHTML += `
                    <div>
                        <div>
                            <p>${resposta.results[i].name}</p>
                        </div>
                        <iframe width="480" height="320" src="${resposta.results[i].data["480"]}"</iframe>
                        <p>Mais detalhes...</p>
                    </div>
                    `
                }                
            }

            if(index < gamesIDs.length){
                index += 1;
                req2.open("GET", `https://api.rawg.io/api/games/${gamesIDs[index]}/movies?key=0f6c2f332bc643a3b1ffb5d13f9bb003`);
                req2.send();
            }
            
            else{
                console.log("FIM DAS")
            }
        }
    }
    
    req2.open("GET", `https://api.rawg.io/api/games/${gamesIDs[0]}/movies?key=0f6c2f332bc643a3b1ffb5d13f9bb003`);
    req2.send();
}

function inserirLojas(){
    const req2 = new XMLHttpRequest();

    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let resposta = JSON.parse(this.responseText)
            let plat = document.querySelector("#plataformas .cards")

            for(let i = 0; i < 6; i++){
                console.log(resposta.results[i].image_background)
                plat.innerHTML += `
                <div class="umdetres" style="width: 100%; background-image: url(${resposta.results[i].image_background}); background-position: center; padding: 16px">
                    <a href="https://${resposta.results[i].domain}" style="font-weight: bold; text-shadow: 0px 0px 3px orange;">${resposta.results[i].name} (${resposta.results[i].games_count} Jogos Registrados)</a>
                </div>
                `
            }
        }
    }
    
    req2.open("GET", storesURL);
    req2.send();
}

function inserirDesenvolvedoras(){
    const req2 = new XMLHttpRequest();

    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let resposta = JSON.parse(this.responseText)
            let plat = document.querySelector("#publishers .cards")

            for(let i = 0; i < 6; i++){
                plat.innerHTML += `
                <div>
                    <p>${resposta.results[i].name}</p>
                    <img src="${resposta.results[i].image_background}" alt="Foto ${resposta.results[i].name}" style="width: 300px; height: 200px; object-fit: cover;" class="">
                    <p>Principais Jogos</p>
                    <ul>
                        <li>${resposta.results[i].games[0].name}</li>
                        <li>${resposta.results[i].games[1].name}</li>
                        <li>${resposta.results[i].games[2].name}</li>
                    </ul>
                    <p class="maisdetalhes"></p>
                </div>
                `
            }
        }
    }
    
    req2.open("GET", developersURL);
    req2.send();
}

function inserirJogos(){
    const req2 = new XMLHttpRequest();    

    req2.onload = function(){
        let showsBrasil = document.querySelector("#jogos .cards")
        let resposta = JSON.parse(this.responseText)

        for (let i=0;i < resposta.results.length; i++){
            showsBrasil.innerHTML+=`
                    <div class="card flexColumnStart" style="width: 300px;">
                        <h3 style="font-size: 22px; width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; padding: 8px">${resposta.results[i].name}</h3>
                        <img src="${resposta.results[i].background_image}" style="width: 100%; height: 200px; object-fit: cover;">
  
                        <ul style="padding: 8px;">
                            <li style="list-style-position: inside;"><strong>Rating:</strong> ${resposta.results[i].metacritic}/100</li>
                            <li style="list-style-position: inside;"><strong>Genre:</strong> ${resposta.results[i].genres[0].name}</li>
                            <li style="list-style-position: inside;"><strong>Lançamento:</strong> ${resposta.results[i].released}</li>
                        </ul>
                        <button><strong><p onclick=detalhes(${resposta.results[i].id})>Mais detalhes...</p></strong></button>
                    </div>
            `
        }
    }
    console.log(url+"&page=2")
    req2.open("GET", url+"&page=2");
    req2.send();
}

function atualizaDados(resposta){
    let gamesIDs = [];

    inserirDestaques()    
    inserirLojas()
    inserirDesenvolvedoras()
    inserirJogos()
}

function inserirDados(resposta){
    
    /*req.onreadystatechange = function(){
        inserirDados(this.responseText);
    }
    
    req.open("GET", url);
    req.send();*/
    
    console.log(resposta)
    console.log(JSON.parse(resposta))
    resposta=JSON.parse(resposta)
    let cardPlataforma = document.querySelector("#PLATAFORMAS .Cards_Plataformas")

    for (let i=0; i<3; i++){
        cardPlataforma.innerHTML+=`
                <div class="Card_Plataforma">
                    <h3>${resposta.results[i].name}</h3> 
                    <img src="${resposta.results[i].background_image}" alt="Disney+">
                    <ul>
                        <li>Rating: ${resposta.results[i].metacritic}</li>
                        <li>Data de lançamento: ${resposta.results[i].released}</li>
                    </ul>
                    <a href="#">Mais Detalhes...</a>
                </div>
        `
    }
    
}

function pesquisa(){
    let resultados=document.getElementById("resultados")
    let input = document.getElementById("barra")
    console.log (input.value)


    req.onreadystatechange = function(){
        if(req.readyState==4){
            resultados.innerHTML=""
            let resposta = JSON.parse(this.responseText)
            console.log(this.responseText);

            for (let i=0;i<10;i++){
                resultados.innerHTML+=`
                <p onclick=detalhes(${resposta.results[i].id})>${resposta.results[i].name}</p>
                `
            }
        }
    }
    if(input.value!=""){
    req.open("GET", `https://api.rawg.io/api/games?key=0f6c2f332bc643a3b1ffb5d13f9bb003&search= ${input.value}` );
    req.send();
    }
    else {
        resultados.innerHTML=""
    }   
}

function detalhes(idJogo){
    localStorage.setItem("jogo",idJogo)
    window.location.href="detalhes.html"
}