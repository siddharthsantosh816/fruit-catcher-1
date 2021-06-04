class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
            playerCount = playerCountRef.val();
            
            player.getCount();
        }
        if (gameState === 0) {
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);

        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];
    }
    
    play(){
        if(form) {
            form.hide();
        } else{
            player.index = playerCount-1
        }
        
        Player.getPlayerInfo();
        //console.log(allPlayers)
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();

        for(var plr in allPlayers){
           
            index = index+1;
            x = allPlayers[plr].distance;
            y = 500;
            
            players[index - 1].x = x+500;
            players[index - 1].y = y;
           // console.log(player.index)
           //console.log(plr)
         // console.log(plr,"player"+[index] )
          var playerIndex= "player"+[index];
          if(plr === playerIndex){
           // console.log(allPlayers[plr].name)
              fill("black");
              textSize(25);
              textAlign(CENTER)
              
              text(allPlayers[plr].name,x+500, y+20); 
            
          }
        }
        // Give movements for the players using arrow keys
        if(keyIsDown(RIGHT_ARROW) ){
            player.distance+=10;
            player.update();
        }

        if(keyIsDown(LEFT_ARROW) ){
            player.distance-=10;
            player.update();
        }


        // Create and spawn fruits randomly
        if(frameCount % 20===0){
            fruits=createSprite(random(100,1000),0,100,100);
            fruits.velocityY=6;
            var rand=Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1",fruit2_img);
                break;
                case 3: fruits.addImage("fruit1",fruit3_img);
                break;
                case 4: fruits.addImage("fruit1",fruit4_img);
                break;
                case 5: fruits.addImage("fruit1",fruit5_img);
                break;
                
            }
            fruitGroup.add(fruits);
        }

        
    }

    end(){
       console.log("Game Ended");
    }
}