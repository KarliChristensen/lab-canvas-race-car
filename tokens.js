export class Tokens {
    constructor(game) {
        this.game = game;
        this.width = 400;
        this.height = 398;
        // Position
        this.x = 0;
        this.y = 100;
    }
    update(){

    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}