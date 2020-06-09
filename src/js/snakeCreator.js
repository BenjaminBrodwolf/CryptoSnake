const testSnakes = [
    {
        "snakeId": "0",
        "name": "Pascal",
        "dna": "5178520655450500",
        "length": 3
    },
    {
        "snakeId": "1",
        "name": "Benjamin",
        "dna": "5254256302953300",
        "length": 3
    },
    {
        "snakeId": "2",
        "name": "Manuel",
        "dna": "8836990722195900",
        "length": 3
    },
    {
        "snakeId": "3",
        "name": "Nadia",
        "dna": "7543389371823100",
        "length": 3
    }
]

const showAllSnakes = async () => {
    let ids = await getSnakeByOwner(userAccount)
    displaySnakes(ids)
}

const initalSnakeCheck = async () => {
    const haveInitialSnake = await gotInitalSnake(userAccount)
    if (!haveInitialSnake) {
        console.log("Hat noch kein InitialSnake")
        document.getElementById("createSnake").style.display = "none"
        document.getElementById("createInitalSnake").style.display = "block"
    } else {
        console.log("Hat bereits ein InitialSnake")
        document.getElementById("createSnake").style.display = "block"
        document.getElementById("createInitalSnake").style.display = "none"
    }
}

const displaySnakes = async snakeIds => {
    console.log("displaySnakes")

    const snakeView = document.getElementById("snakes")
    const snakesLength = snakeIds.length;
    document.getElementById("snakeamount").innerText = snakesLength;
    snakeView.innerHTML = (snakesLength > 0) ? "" : "<h5>You have no Snakes yet. Create your initial Snake for free.</h5>"

    let snakeList = ""
    let i = 0;

    for (id of snakeIds) {

        const snake = await getSnakeDetails(id)

        const bodydna = coloringSnake(snake.dna)

        const snakesvg = `<svg width="336" height="380" viewBox="130 100 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M411.86 160.456L426.397 149.267C432.738 155.173 443.761 170.644 437.126 185.275C428.833 203.564 443.164 169.284 411.86 160.456Z" fill="black"/>
                                            <path d="M379.612 228.073C386.835 223.455 406.583 217.879 427.79 232.522C454.3 250.825 460.837 254.345 477.386 249.969C461.812 254.336 467.365 256.889 444.514 247.66C421.663 238.431 452.407 257.348 474.52 256.825C451.483 263.211 442.6 251.906 423.975 242.314C405.349 232.722 412.443 225.828 379.612 228.073Z" fill="black"/>
                                            <path d="M386.976 178.567L401.513 167.379C407.854 173.285 416.584 187.92 412.243 203.387C409.406 213.495 418.28 187.395 386.976 178.567Z" fill="black"/>
                                            <path snakepart="1"  fill=${bodydna[0]} fill-rule="evenodd" clip-rule="evenodd" d="M234.694 212.19C244.976 210.146 267.819 202.594 289.826 190.168C317.335 174.635 332.98 155.198 339.239 150.695C344.733 146.743 343.734 144.15 366.797 140.692C370.37 140.156 388.687 115.126 407.286 121.79C422.672 127.303 424.104 140.18 422.755 142.144C420.508 145.416 372.057 183.363 346.533 202.672C341.256 206.623 335.019 217.282 352.292 228.317C369.564 239.352 407.403 256.34 424.163 263.454C431.249 267.728 441.205 277.809 424.346 283.944C403.272 291.613 388.91 285.887 365.719 275.035C342.529 264.183 303.079 253.801 287.81 255.889C272.542 257.977 264.62 255.904 250.225 259.026C242.775 260.642 233.855 264.416 231.47 264.437C238.65 255.049 253.839 228.933 234.694 212.19ZM385.237 129.468C393.371 129.721 386.909 134.657 383.657 134.686C380.405 134.715 378.742 130.628 385.237 129.468ZM341.286 161.411C342.758 164.611 346.847 164.939 349.452 165.241L342.636 166.928C344.698 167.127 350.313 166.99 356.279 164.855C362.245 162.72 364.563 157.625 364.976 155.345L360.786 159.61C361.431 158.954 361.219 155.579 360.08 153.437C357.551 148.678 350.981 148.765 346.403 151.607C342.734 153.885 339.481 157.487 341.286 161.411Z" />
                                            <path d="M349.347 153.533C351.559 152.763 353.995 152.781 355.213 154.781C356.072 156.191 356.006 157.541 355.251 159.009C354.237 160.982 352.278 161.517 350.068 161.332C347.961 161.156 345.5 159.747 345.488 158.446C345.476 157.145 347.043 154.334 349.347 153.533Z" fill="black"/>
                                            <path snakepart="2"  fill=${bodydna[1]}   d="M173.314 288.408C173.314 288.408 198.453 227.984 224.95 215.174C236.869 209.411 242.212 212.758 250.157 217.93C258.43 223.316 260.673 235.633 256.038 250.137C251.567 264.129 210.339 303.545 210.339 303.545C210.339 303.545 208.076 289.169 199.886 284.368C192.771 280.197 173.314 288.408 173.314 288.408Z" />
                                            <path snakepart="3"  fill=${bodydna[2]}   d="M211.045 371.535C211.045 371.535 165.692 333.138 167.514 304.595C168.334 291.755 169.678 282.395 179.017 275.949C188.739 269.238 199.368 268.442 211.011 276.31C222.242 283.899 245.814 339.396 245.814 339.396C245.814 339.396 230.569 338.206 221.461 344.975C213.548 350.856 211.045 371.535 211.045 371.535Z" />
                                            <path snakepart="4"  fill=${bodydna[3]}   d="M301.435 393.634C301.435 393.634 236.65 396.537 214.569 376.858C204.637 368.006 197.943 361.094 199.508 351.164C201.137 340.827 208.284 333.778 223.283 331.739C237.752 329.772 300.582 351.372 300.582 351.372C300.582 351.372 288.419 359.966 287.289 369.964C286.306 378.65 301.435 393.634 301.435 393.634Z" />
                                            <path snakepart="5"  fill=${bodydna[4]}   d="M373.227 379.927C373.227 379.927 322.406 403.678 298.379 393.121C287.57 388.372 279.98 384.317 278.008 374.845C275.955 364.985 279.378 356.292 290.7 349.56C301.623 343.066 358.832 342.065 358.832 342.065C358.832 342.065 351.903 353.788 354.244 363.18C356.277 371.339 373.227 379.927 373.227 379.927Z" />
                                            <path snakepart="6"  fill=${bodydna[5]}   d="M424.907 396.991C424.907 396.991 404.139 348.805 379.441 343.185C368.331 340.657 360.037 339.449 352.133 345.766C343.905 352.343 340.459 361.176 344.102 373.047C347.617 384.498 388.572 418.467 388.572 418.467C388.572 418.467 391.535 405.213 399.653 399.173C406.705 393.925 424.907 396.991 424.907 396.991Z" />
                                            <path snakepart="7"  fill=${bodydna[6]}   d="M396.12 490.553C396.12 490.553 435.092 439.341 431.203 410.153C429.454 397.024 427.488 387.639 418.355 383.278C408.846 378.739 398.957 380.569 388.798 391.65C378.999 402.339 361.488 465.866 361.488 465.866C361.488 465.866 375.492 460.821 384.437 465.574C392.208 469.703 396.12 490.553 396.12 490.553Z" />
                                            <path snakepart="8"  fill=${bodydna[7]}   d="M324.519 550.475C324.519 550.475 382.834 519.745 393.251 491.987C397.937 479.501 400.662 470.295 394.742 462.793C388.578 454.982 379.066 452.745 364.939 458.717C351.312 464.478 305.929 514.698 305.929 514.698C305.929 514.698 320.561 515.66 326.131 523.442C330.969 530.202 324.519 550.475 324.519 550.475Z" />
                                            <path snakepart="9"  fill=${bodydna[8]}   d="M245.711 557.548C245.711 557.548 296.071 571.501 316.149 556.799C325.181 550.186 331.401 544.838 331.575 535.219C331.756 525.204 327.149 517.33 315.682 512.813C304.62 508.455 252.337 517.908 252.337 517.908C252.337 517.908 260.657 528.105 260.134 537.714C259.679 546.061 245.711 557.548 245.711 557.548Z" />
                                            <path snakepart="10" fill=${bodydna[9]}   d="M176.92 529.03C176.92 529.03 217.331 561.662 241.231 557.775C251.982 556.026 259.69 554.161 263.545 546.213C267.558 537.939 266.397 529.453 257.71 520.905C249.331 512.66 198.177 498.743 198.177 498.743C198.177 498.743 201.82 510.714 197.652 518.507C194.03 525.277 176.92 529.03 176.92 529.03Z" />
                                            <path snakepart="11" fill=${bodydna[10]}  d="M140.553 478.079C140.553 478.079 146.179 514.25 168.932 525.38C179.167 530.387 184.365 536.449 193.506 532.111C203.023 527.595 208.401 519.787 207.576 507.397C206.779 495.446 182.249 490.422 166.056 470.164C157.493 459.452 151.693 434.501 140.831 431.221C134.061 429.177 140.553 478.079 140.553 478.079Z" />
                                        </svg>`;

        const nameArray = await getParentNames(snakeIds[i])

        const names = nameArray.split(";")
        let childOf = "&nbsp;"
        if (names[0] != names[1]) {
            childOf = `Child of  <span style="font-weight: bold">${names[0]}</span>  & <span style="font-weight: bold">${names[1]}</span>`
        }
        const snakeID = snakeIds[i];
        snakeList = `
                    <snake snakeid="${snakeID}">
                        <fieldset class="itemfieldset">
                            <legend class="itemlegend">
                                ${snake.name}
                            </legend>
                  <div class="snakeview">
                        ${snakesvg}
                   </div>

                    <div class="info">
                        <p style="font-size: 0.8rem"> ${childOf} </p>
                        
                        <fieldset>
                            <p><span>ID:    </span> ${snakeID} </p>
                            <p><span>DNA:   </span> ${snake.dna} </p>
                            <p><span>Level: </span> ${snake.level} </p>
                        </fieldset>
                    </div>
                    
                    <div class="toProjectContainer">
                        <div style='float: left;'>
                            <button type="button" onclick="pairingClick(this)" class="button">
                                Pairing
                             </button> 
                        </div>
                        <div style='float: right;'>
                             <button type="button" onclick="" class="button">
                                Feed
                             </button> 
                        </div>
                    </div>
                    
                    <hr>
                    
                     <div class="toProjectContainer">
                     <h4>Sell Snake on Marktplace</h4>
                        <div style='display: flex'>
                             <label for="sellPriceInput">Sell price:</label>
                             <input  type="number" step="0.01" name="sellPriceInput" class="form-control" placeholder="e.g. 0.01">
                             <button type="button" onclick="addSnakeToMarketplace(this, ${snakeID})" class="button">Sell</button> 

                         </div>
                       </div>
                       
                    <hr>

                    <div class="toProjectContainer">
                     <h4>Send Snake to someone</h4>
                        <div style='display: flex'>
                             <label for="newOwnerAddressInput">New Owner Address:</label>
                             <input type="text" name="newOwnerAddressInput" class="form-control" placeholder="Account Address">
                             <button type="button" onclick="transferSnakeTo(this)" class="button">Send</button> 

                        </div>
                    </div>
              
                  </fieldset>
                </snake>`

        snakeView.innerHTML += snakeList;
        i++


    }
}

const coloringSnake = dna => {

    const snakebodys = []
    let chunks = [];
    for (let i = 0, charsLength = dna.length; i < charsLength; i += 3) {
        chunks.push(dna.substring(i, i + 3));
    }

    const head = chunks[3] + chunks[4] + chunks[5]
    chunks[5] = head.substring(1, 4)
    chunks.push(head.substring(4, 7))

    const c1 = chunks[0] + chunks[1]
    const c2 = chunks[1] + chunks[2]
    const c3 = chunks[2] + chunks[3]
    const c4 = chunks[3] + chunks[4]
    const c5 = chunks[4] + chunks[5]
    const c6 = chunks[5] + chunks[6]

    snakebodys.push("#" + c1)
    snakebodys.push("#" + newcolor(c1, c2))
    snakebodys.push("#" + c2)
    snakebodys.push("#" + newcolor(c2, c3))
    snakebodys.push("#" + c3)
    snakebodys.push("#" + newcolor(c3, c4))
    snakebodys.push("#" + c4)
    snakebodys.push("#" + newcolor(c4, c5))
    snakebodys.push("#" + c5)
    snakebodys.push("#" + newcolor(c5, c6))
    snakebodys.push("#" + c6)

    return snakebodys
}


// ----------------- CONTRACT FUNCTION ---------------


const getSnakeDetails = async snakeId => {
    return await cryptoSnakeReproduction.methods.snakes(snakeId).call();
}

const getOwnerOfSnake = async snakeId => {
    return await cryptoSnakeReproduction.methods.snakeToOwner(snakeId).call()
}

const gotInitalSnake = (address) => {
    return cryptoSnakeReproduction.methods.gotInitialSnake(address).call()
}

const createInitialSnake = async () => {
    let name = nameInputField.value;
    if (name.length < 2) {
        fireNotify(`Nameinput ist empty or to small`)
    } else {
        console.log("createInitialSnake: " + name)
        await cryptoSnakeReproduction.methods.createInitialSnake(name).send({
            from: userAccount
        })
    }
    await initalSnakeCheck();
    await showAllSnakes();
}

const createPayedSnake = async () => {
    console.log("createPayedSnake")
    let name = nameInputField.value;
    if (name.length < 2) {
        fireNotify(`Nameinput ist empty or to small`)

    } else {
        await cryptoSnakeReproduction.methods.createPayedSnake(name).send({
            from: userAccount,
            value: window.web3.utils.toWei("0.001", "ether")
        });
    }
    await showAllSnakes()

}

function getSnakeByOwner(owner) {
    return cryptoSnakeReproduction.methods.getSnakesByOwner(owner).call()
}


