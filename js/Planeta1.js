class Planeta1 {
    constructor() {
      this.playerMoving = false;
      this.leftKeyActive = false;
      this.blast = false;
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();
  
      powerCoins = new Group();
  
      obstacles = new Group();
  
      var obstaclesPositions = [
        { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
        { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
        { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
        { x: width / 2, y: height - 2800, image: obstacle2Image },
        { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
        { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
        { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
        { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
        { x: width / 2, y: height - 5300, image: obstacle1Image },
        { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
      ];
  
  
      this.addSprites(
        obstacles,
        obstaclesPositions.length,
        obstacle1Image,
        0.04,
        obstaclesPositions
      );
    }
  
    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
      for (var i = 0; i < numberOfSprites; i++) {
        var x, y;
  
        //C41 //SA
        if (positions.length > 0) {
          x = positions[i].x;
          y = positions[i].y;
          spriteImage = positions[i].image;
        } else {
          x = random(width / 2 + 150, width / 2 - 150);
          y = random(-height * 4.5, height - 400);
        }
        var sprite = createSprite(x, y);
        sprite.addImage("sprite", spriteImage);
  
        sprite.scale = scale;
        spriteGroup.add(sprite);
      }
    }
  
    // handleElements() {
    //   form.hide();
    //   form.titleImg.position(40, 50);
    //   form.titleImg.class("gameTitleAfterEffect");
  
    //   //C39
    //   this.resetTitle.html("Reset Game");
    //   this.resetTitle.class("resetText");
    //   this.resetTitle.position(width / 2 + 200, 40);
  
    //   this.resetButton.class("resetButton");
    //   this.resetButton.position(width / 2 + 230, 100);
  
    //   this.leadeboardTitle.html("Leaderboard");
    //   this.leadeboardTitle.class("resetText");
    //   this.leadeboardTitle.position(width / 3 - 60, 40);
  
    //   this.leader1.class("leadersText");
    //   this.leader1.position(width / 3 - 50, 80);
  
    //   this.leader2.class("leadersText");
    //   this.leader2.position(width / 3 - 50, 130);
    // }
  
    play() {
    //   this.handleElements();
     
  
    //   Player.getPlayersInfo();
  
  
    //   if (allPlayers !== undefined) {
    //     image(track, 0, -height * 5, width, height * 6);
  
    //     this.showFuelBar();
    //     this.showLife();
    //     this.showLeaderboard();
  
    //      //índice da matriz
    //     var index = 0;
    //     for (var plr in allPlayers) {
    //       //adicione 1 ao índice para cada loop
    //       index = index + 1;
  
    //       //use os dados do banco de dados para exibir os carros nas direções x e y
    //       var x = allPlayers[plr].positionX;
    //       var y = height - allPlayers[plr].positionY;
  
    //       var currentlife = allPlayers[plr].life;
  
    //       if (currentlife <= 0) {
    //         cars[index - 1].changeImage("blast");
    //         cars[index - 1].scale = 0.3;
    //       }
  
    //       cars[index - 1].position.x = x;
    //       cars[index - 1].position.y = y;
  
    //       if (index === player.index) {
    //         stroke(10);
    //         fill("red");
    //         ellipse(x, y, 60, 60);
  
    //         this.handleFuel(index);
    //         this.handlePowerCoins(index);
    //         this.handleCarACollisionWithCarB(index);
    //         this.handleObstacleCollision(index);
  
    //         if (player.life <= 0) {
    //           this.blast = true;
    //           this.playerMoving = false;
    //         }
  
    //         //alterar a posição da câmera na direção y
    //         camera.position.y = cars[index - 1].position.y;
    //       }
    //     }
  
    //     if (this.playerMoving) {
    //       player.positionY += 5;
    //       player.update();
    //     }
  
    //     //manipulando eventos de teclado
    //     this.handlePlayerControls();
  
    //     //Linha de chegada
    //     const finshLine = height * 6 - 100;
  
    //     if (player.positionY > finshLine) {
    //       gameState = 2;
    //       player.rank += 1;
    //       Player.updateCarsAtEnd(player.rank);
    //       player.update();
    //       this.showRank();
    //     }
  
    //     drawSprites();
    //   }
    }
  
    
  
  
  
    handlePlayerControls() {
      if (!this.blast) {
        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
  
        if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          this.leftKeyActive = true;
          player.positionX -= 5;
          player.update();
        }
  
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
          this.leftKeyActive = false;
          player.positionX += 5;
          player.update();
        }
      }
    }
  
   
    handleObstacleCollision(index) {
      if (cars[index - 1].collide(obstacles)) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }
  
        //Reduzindo a vida do jogador
        if (player.life > 0) {
          player.life -= 185 / 4;
        }
  
        if(player.life <= 0) {
          player.update();
          this.gameOver()
        }
      }
    }
  
    
  
    showRank() {
      swal({
        title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
        text: "Você alcançou a linha de chegada com sucesso!",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Ok"
      });
    }
  
    gameOver() {
      swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu a corrida!",
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      });
    }
    
    end() {
      console.log("Fim de Jogo");
    }
  }
  