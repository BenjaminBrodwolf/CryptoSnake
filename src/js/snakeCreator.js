async function showAllSnakes() {
    document.getElementById("snakes").innerHTML = ""
    let ids = await getSnakeByOwner(userAccount)
    displaySnakes(ids)
}

function displaySnakes(snakeIds) {
    for (id of snakeIds) {
        getSnakeDetails(id)
            .then(function (snake) {
                document.getElementById("snakes").innerHTML += `
                <div>
                   <ul>
                    <li>Name: ${snake.name}</li>
                    <li>DNA: ${snake.dna}</li>
                    <li>Level: ${snake.level}</li>
                  </ul>
                </div> `


                const bodydna = coloringSnake(snake.dna)
                console.log(bodydna)

                document.getElementById("snakes").innerHTML += `
            <snake snakeid=${id}>
                <fieldset class="itemfieldset">
                    <legend class="itemlegend">
                     Snake-Name
                    </legend>

                 <h3> Snake Bild Hier !!!</h3>
                 
           

          <div class="snakeview">
              <div class="snakebody body1"></div>
              <div class="snakebody body2"></div>
              <div class="snakebody body3"></div>
              <div class="snakebody body4"></div>
              <div class="snakebody body5"></div>
              <div class="snakebody body6"></div>
              <div class="snakebody body7"></div>
              <div class="snakebody body8"> </div>
              <div class="snakebody body9"></div>
              <div class="snakebody body10"></div>
           </div>
    
            <div class="info">
                <fieldset>
                <legend>Snake Attribute</legend>
                    <p><span>Owner:</span> ${snake.name} </p>
                    <p><span>Dna:</span> ${snake.dna} </p>
                    <p><span>Level:</span> ${snake.level} </p>
                </fieldset>
            </div>
            
            <div class="toProjectContainer">
                <a class="button"> Snake Level Up</a>
            </div>
          </fieldset>
        </snake>`


            });
    }
}

function getSnakeDetails(snakeId) {
    return cryptoSnakes.methods.snakes(snakeId).call();
}

async function getOwnerOfSnake(snakeId) {
    return await cryptoSnakes.methods.snakeToOwner(snakeId).call()
}

function createInitialSnake(snakeName) {
    console.log("createInitialSnake: " + snakeName)
    return cryptoSnakes.methods.createInitalSnake(snakeName).send({
        from: userAccount
    })
}

async function createPayedSnake() {
    console.log("createPayedSnake")

    let name = document.getElementById("snakeInputName").value;
    await cryptoSnakes.methods.createPayedSnake(name).send({
        from: userAccount,
        value: window.web3.utils.toWei("0.001", "ether")
    });
}

function getSnakeByOwner(owner) {
    return cryptoSnakes.methods.getSnakesByOwner(owner).call()
}


const coloringSnake = dna => {

    const snakebodys = [] //document.getElementsByClassName("snakeview")[0].children

    let chunks = [];
    for (let i = 0, charsLength = dna.length; i < charsLength; i += 3) {
        chunks.push(dna.substring(i, i + 3));
    }

    const head = chunks[3] + chunks[4] + chunks[5]
    chunks[5] = head.substring(1, 4)
    chunks.push(head.substring(4, 7))


    let c1 = chunks[0] + chunks[1]
    let c2 = chunks[1] + chunks[2]
    let c3 = chunks[2] + chunks[3]
    let c4 = chunks[3] + chunks[4]
    let c5 = chunks[4] + chunks[5]
    let c6 = chunks[5] + chunks[6]

    snakebodys[0].style.backgroundColor = "#" + c1;
    snakebodys[1].style.backgroundColor = "#" + newcolor(c1, c2)
    snakebodys[2].style.backgroundColor = "#" + c2;
    snakebodys[3].style.backgroundColor = "#" + newcolor(c2, c3)
    snakebodys[4].style.backgroundColor = "#" + c3;
    snakebodys[5].style.backgroundColor = "#" + newcolor(c3, c4)
    snakebodys[6].style.backgroundColor = "#" + c4;
    snakebodys[7].style.backgroundColor = "#" + newcolor(c4, c5)
    snakebodys[8].style.backgroundColor = "#" + c5;
    snakebodys[9].style.backgroundColor = "#" + newcolor(c5, c6)
    snakebodys[8].style.backgroundColor = "#" + c6;

    return snakebodys
}