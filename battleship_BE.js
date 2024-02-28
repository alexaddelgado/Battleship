//Game functions
document.addEventListener('DOMContentLoaded', function() {
    //global variables
    let player_coordinates = [];
    let player_destoyer = [];
    let player_cruiser = [];
    let player_submarine = [];
    let player_battleship = [];
    let player_carrier = [];
    let current_ship;
    const gridSize = 10;
    let game_start = false;
    let opp_turn = false;
    const info_display = document.getElementById('info_display');
    const pdestroyer_display = document.getElementById('destroyer_display');
    const pcruiser_display = document.getElementById('cruiser_display');
    const psubmarine_display = document.getElementById('submarine_display');
    const pbattleship_display = document.getElementById('battleship_display');
    const pcarrier_display = document.getElementById('carrier_display');
    const edestroyer_display = document.getElementById('edestroyer_display');
    const ecruiser_display = document.getElementById('ecruiser_display');
    const esubmarine_display = document.getElementById('esubmarine_display');
    const ebattleship_display = document.getElementById('ebattleship_display');
    const ecarrier_display = document.getElementById('ecarrier_display');

    //Sleep function
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    //Handles the ship and board layer
    document.getElementById("startButton").addEventListener("click", function() {
        finalizeCoords();

        let valid = validplacement(player_coordinates);

        if (valid) {
            turn_display.textContent = "Your Turn";
            info_display.textContent = "Game has started!";
            pdestroyer_display.textContent = "Active";
            pcruiser_display.textContent = "Active";
            psubmarine_display.textContent = "Active";
            pbattleship_display.textContent = "Active";
            pcarrier_display.textContent = "Active";
            edestroyer_display.textContent = "Active";
            ecruiser_display.textContent = "Active";
            esubmarine_display.textContent = "Active";
            ebattleship_display.textContent = "Active";
            ecarrier_display.textContent = "Active";
            document.getElementById("ship-layer").style.zIndex = "0";
            document.getElementById("board-layer").style.zIndex = "1";
            game_start = true;
            player_ships = player_coordinates;
            document.getElementById("startButton").disabled = true;
            enemy_canvas.addEventListener('click', handleCanvasClick);
        }
        else {
            info_display.textContent = "Ships cannot overlap. Please try again.";
        }
    });

    //Set up ship dragging
    let destroyer = document.getElementById('destroyer-preview');
    let cruiser = document.getElementById('cruiser-preview');
    let submarine = document.getElementById('submarine-preview');
    let battleship = document.getElementById('battleship-preview');
    let carrier = document.getElementById('carrier-preview');
    let player_board = document.getElementById('ship-layer');

    //To access ship coordinates
    let destroyer_style = window.getComputedStyle(destroyer);
    let cruiser_style = window.getComputedStyle(cruiser);
    let submarine_style = window.getComputedStyle(submarine);
    let battleship_style = window.getComputedStyle(battleship);
    let carrier_style = window.getComputedStyle(carrier);

    let offsetX, offsetY;

    destroyer.addEventListener('mousedown', function(event) {
    offsetX = event.clientX - destroyer.getBoundingClientRect().left;
    offsetY = event.clientY - destroyer.getBoundingClientRect().top;
    current_ship = destroyer;
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    });

    cruiser.addEventListener('mousedown', function(event) {
        offsetX = event.clientX - cruiser.getBoundingClientRect().left;
        offsetY = event.clientY - cruiser.getBoundingClientRect().top;
        current_ship = cruiser;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    submarine.addEventListener('mousedown', function(event) {
        offsetX = event.clientX - submarine.getBoundingClientRect().left;
        offsetY = event.clientY - submarine.getBoundingClientRect().top;
        current_ship = submarine;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    battleship.addEventListener('mousedown', function(event) {
        offsetX = event.clientX - battleship.getBoundingClientRect().left;
        offsetY = event.clientY - battleship.getBoundingClientRect().top;
        current_ship = battleship;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    carrier.addEventListener('mousedown', function(event) {
        offsetX = event.clientX - carrier.getBoundingClientRect().left;
        offsetY = event.clientY - carrier.getBoundingClientRect().top;
        current_ship = carrier;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(event) {
    let x = event.clientX - offsetX - player_board.getBoundingClientRect().left;
    let y = event.clientY - offsetY - player_board.getBoundingClientRect().top;
    let snap_x;
    let snap_y;

    if (x >= 0 && y >= 0 && x + current_ship.offsetWidth <= player_board.offsetWidth && y + current_ship.offsetHeight <= player_board.offsetHeight) {
        snap_x = nearestsnap(x);
        snap_y = nearestsnap(y);
        current_ship.style.left = snap_x + 'px';
        current_ship.style.top = snap_y + 'px';
    }
    }

    function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    }

    //Making snappable ship placement
    function nearestsnap(number) {
        let remainder = number % 35;
        
        if (remainder < 17.5) {
            return number - remainder;
        } else {
            return number + (35 - remainder);
        }
    }

    //Add ship coordinates
    function finalizeCoords() {
        player_coordinates = [];
        let destroyer_x = parseInt(destroyer_style.getPropertyValue('left')) / 35;
        let destroyer_y = parseInt(destroyer_style.getPropertyValue('top')) / 35;

        for (let i = 0; i < 2; i++) {
            player_coordinates.push([destroyer_x, destroyer_y]);
            player_destoyer.push([destroyer_x, destroyer_y]);
            destroyer_x++;
        }

        let cruiser_x = parseInt(cruiser_style.getPropertyValue('left')) / 35;
        let cruiser_y = parseInt(cruiser_style.getPropertyValue('top')) / 35;

        for (let i = 0; i < 3; i++) {
            player_coordinates.push([cruiser_x, cruiser_y]);
            player_cruiser.push([cruiser_x, cruiser_y]);
            cruiser_x++;
        }

        let submarine_x = parseInt(submarine_style.getPropertyValue('left')) / 35;
        let submarine_y = parseInt(submarine_style.getPropertyValue('top')) / 35;

        for (let i = 0; i < 3; i++) {
            player_coordinates.push([submarine_x, submarine_y]);
            player_submarine.push([submarine_x, submarine_y]);
            submarine_y++;
        }

        let battleship_x = parseInt(battleship_style.getPropertyValue('left')) / 35;
        let battleship_y = parseInt(battleship_style.getPropertyValue('top')) / 35;

        for (let i = 0; i < 4; i++) {
            player_coordinates.push([battleship_x, battleship_y]);
            player_battleship.push([battleship_x, battleship_y]);
            battleship_x++;
        }

        let carrier_x = parseInt(carrier_style.getPropertyValue('left')) / 35;
        let carrier_y = parseInt(carrier_style.getPropertyValue('top')) / 35;

        for (let i = 0; i < 5; i++) {
            player_coordinates.push([carrier_x, carrier_y]);
            player_carrier.push([carrier_x, carrier_y]);
            carrier_y++;
        }
    }

    //Checks if ship coordinates are all valid
    function validplacement(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i].every((value, index) => value === arr[j][index])) {
                    return false;
                }
            }
        }
        return true;
    }

    //Setting up player board
    const player_canvas = document.getElementById('playerGrid');
    const player_ctx = player_canvas.getContext('2d');
    const player_cellSize = player_canvas.width / gridSize;
    let player_ships = player_coordinates;
    let player_moves = [];
    let player_hits = [];
    let p_hitcount = 0;
    let p_misscount = 0;

    //Draw player board
    function player_drawBoard() {
        player_ctx.clearRect(0, 0, player_canvas.width,player_canvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                player_ctx.strokeRect(i * player_cellSize, j * player_cellSize, player_cellSize, player_cellSize);
            }
        }
    }

    //Setting up enemy board
    const enemy_canvas = document.getElementById('enemyGrid');
    const enemy_ctx = enemy_canvas.getContext('2d');
    const enemy_cellSize = enemy_canvas.width / gridSize;
    let enemy_ships = [[2,1],[3,1],[2,4],[2,5],[2,6],[6,7],[7,7],[8,7],[6,2],[6,3],[6,4],[6,5],[8,0],[8,1],[8,2],[8,3],[8,4]];
    let enemy_destroyer = [[2,1],[3,1]];
    let enemy_cruiser = [[2,4],[2,5],[2,6]];
    let enemy_submarine = [[6,7],[7,7],[8,7]];
    let enemy_battleship = [[6,2],[6,3],[6,4],[6,5]];
    let enemy_carrier = [[8,0],[8,1],[8,2],[8,3],[8,4]];
    let enemy_moves = [];
    let enemy_hits = [];
    let e_hitcount = 0;
    let e_misscount = 0;

    //Draw enemy board
    function enemy_drawBoard() {
        enemy_ctx.clearRect(0, 0, enemy_canvas.width,enemy_canvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                enemy_ctx.strokeRect(i * enemy_cellSize, j * enemy_cellSize, enemy_cellSize, enemy_cellSize);
            }
        }
    }

    //Missile functionality
    function handleCanvasClick(event) {
        if (game_start && !opp_turn) {
            const rect = enemy_canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const gridX = Math.floor(x / enemy_cellSize);
            const gridY = Math.floor(y / enemy_cellSize);

            if (!player_moves.some(hit => hit[0] === gridX && hit[1] === gridY)) {
                if (enemy_ships.some(ship => ship[0] === gridX && ship[1] === gridY)) {
                    enemy_ctx.fillStyle = 'red';
                    enemy_ctx.fillRect(gridX * enemy_cellSize, gridY * enemy_cellSize, enemy_cellSize, enemy_cellSize);
                    player_moves.push([gridX, gridY]);
                    enemy_hits.push([gridX, gridY]);
                    info_display.textContent = "Enemy ship hit!";
                    sunkenemyship(enemy_destroyer, enemy_hits);
                    sunkenemyship(enemy_cruiser, enemy_hits);
                    sunkenemyship(enemy_submarine, enemy_hits);
                    sunkenemyship(enemy_battleship, enemy_hits);
                    sunkenemyship(enemy_carrier, enemy_hits);
                    p_hitcount++;
                    document.getElementById("p_hit").innerHTML = p_hitcount;
                    checkScore('You',enemy_hits);
                } else {
                    enemy_ctx.fillStyle = 'blue';
                    enemy_ctx.fillRect(gridX * enemy_cellSize, gridY * enemy_cellSize, enemy_cellSize, enemy_cellSize);
                    player_moves.push([gridX, gridY]);
                    info_display.textContent = "Miss!"
                    p_misscount++;
                    document.getElementById("p_miss").innerHTML = p_misscount;
                }
                if (game_start) {
                    enemy_move();
                }
            } else {
                info_display.textContent = "Invalid move. Already selected coordinate"
            }
        }
    }

    //Enemy move
    async function enemy_move() {
        turn_display.textContent = "Opponent's turn";
        opp_turn = true;

        await sleep(1000);
        
        while (opp_turn) {
            const opp_x = Math.floor(Math.random() * 10);
            const opp_y = Math.floor(Math.random() * 10);
            
            if (!enemy_moves.some(hit => hit[0] === opp_x && hit[1] === opp_y)) {
                if (player_ships.some(ship => ship[0] === opp_x && ship[1] === opp_y)) {
                    player_ctx.fillStyle = 'red';
                    player_ctx.fillRect(opp_x * player_cellSize, opp_y * player_cellSize, player_cellSize, player_cellSize);
                    enemy_moves.push([opp_x, opp_y]);
                    player_hits.push([opp_x, opp_y]);
                    info_display.textContent = "Player ship hit!";
                    sunkplayership(player_destoyer, player_hits);
                    sunkplayership(player_cruiser, player_hits);
                    sunkplayership(player_submarine, player_hits);
                    sunkplayership(player_battleship, player_hits);
                    sunkplayership(player_carrier, player_hits);
                    e_hitcount++;
                    document.getElementById("e_hit").innerHTML = e_hitcount;
                    checkScore('Enemy',player_hits,player_ships);
                } else {
                    player_ctx.fillStyle = 'blue';
                    player_ctx.fillRect(opp_x * player_cellSize, opp_y * player_cellSize, player_cellSize, player_cellSize);
                    enemy_moves.push([opp_x, opp_y]);
                    info_display.textContent = "Miss!"
                    e_misscount++;
                    document.getElementById("e_miss").innerHTML = e_misscount;
                }
                opp_turn = false;
                turn_display.textContent = "Your turn";
            }
        }
    }

    //Checks if player ship has been sunk
    function sunkplayership(ship, moves) {
        let set = new Set(ship.map(JSON.stringify));
        let sunk = true;
        let p_match = 0;
        let status_updater;

        if (ship === player_destoyer) {
            status_updater = pdestroyer_display;
        }
        else if (ship === player_cruiser) {
            status_updater = pcruiser_display;
        }
        else if (ship === player_submarine) {
            status_updater = psubmarine_display;
        }
        else if (ship === player_battleship) {
            status_updater = pbattleship_display;
        }
        else {
            status_updater = pcarrier_display;
        }
    
        for (let i = 0; i < moves.length; i++) {
            if (set.has(JSON.stringify(moves[i]))) {
                p_match++;
                sunk = false;
            }
        }
        
        if (!sunk && (p_match === ship.length)) {
            for (let i = 0; i < ship.length; i++) {
                let arr_X = ship[i][0];
                let arr_Y = ship[i][1];
                player_ctx.fillStyle = 'black';
                player_ctx.fillRect(arr_X * player_cellSize, arr_Y * player_cellSize, player_cellSize, player_cellSize);
                status_updater.textContent = "Sunk";
            }
        }
    }

    //Checks if enemy ship has been sunk
    function sunkenemyship(ship, moves) {
        let set = new Set(ship.map(JSON.stringify));
        let sunk = true;
        let e_match = 0;
        let enemy_updater;

        if (ship === enemy_destroyer) {
            enemy_updater = edestroyer_display;
        }
        else if (ship === enemy_cruiser) {
            enemy_updater = ecruiser_display;
        }
        else if (ship === enemy_submarine) {
            enemy_updater = esubmarine_display;
        }
        else if (ship === enemy_battleship) {
            enemy_updater = ebattleship_display;
        }
        else {
            enemy_updater = ecarrier_display;
        }
    
        for (let i = 0; i < moves.length; i++) {
            if (set.has(JSON.stringify(moves[i]))) {
                e_match++;
                sunk = false;
            }
        }
        
        if (!sunk && (e_match === ship.length)) {
            for (let i = 0; i < ship.length; i++) {
                let arr_X = ship[i][0];
                let arr_Y = ship[i][1];
                enemy_ctx.fillStyle = 'black';
                enemy_ctx.fillRect(arr_X * enemy_cellSize, arr_Y * enemy_cellSize, enemy_cellSize, enemy_cellSize);
                enemy_updater.textContent = "Sunk";
            }
        }
    }

    

    //Check game over
    function checkScore(user, hits) {
        hits_length = hits.length;
        if (hits_length === 17) {
            let info_box = document.getElementById('game-info');
            info_box.style.backgroundColor = 'green';
            info_display.textContent = user + " win!";
            game_start = false;
        }

    }

    //initialize game
    function initGame() {
        turn_display.textContent = "-";
        info_display.textContent = "Drag and drop ships to desired placements. When ready, click 'Start'";
        pdestroyer_display.textContent = "Pending";
        pcruiser_display.textContent = "Pending";
        psubmarine_display.textContent = "Pending";
        pbattleship_display.textContent = "Pending";
        pcarrier_display.textContent = "Pending";
        edestroyer_display.textContent = "Pending";
        ecruiser_display.textContent = "Pending";
        esubmarine_display.textContent = "Pending";
        ebattleship_display.textContent = "Pending";
        ecarrier_display.textContent = "Pending";
        document.getElementById("startButton").disabled = false;
        player_drawBoard();
        enemy_drawBoard();
        p_hitcount = 0;
        p_misscount = 0;
        e_misscount = 0;
        e_hitcount = 0;
        player_moves = [];
        player_hits = [];
        enemy_moves = [];
        enemy_hits = [];
        player_destoyer = [];
        player_cruiser = [];
        player_submarine = [];
        player_battleship = [];
        player_carrier = [];
        enemy_canvas.removeEventListener('click', handleCanvasClick);
        let info_box = document.getElementById('game-info');
        info_box.style.backgroundColor = 'aliceblue';
        document.getElementById("p_hit").innerHTML = p_hitcount;
        document.getElementById("p_miss").innerHTML = p_misscount;
        document.getElementById("e_hit").innerHTML = e_hitcount;
        document.getElementById("e_miss").innerHTML = e_misscount;
        document.getElementById("ship-layer").style.zIndex = "1";
        document.getElementById("board-layer").style.zIndex = "0";
    }

    //First initalization of game
    initGame();

    //To start a new game
    document.getElementById("newButton").addEventListener("click", function() {
        initGame();
    });
})