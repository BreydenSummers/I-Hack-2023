class Map {
    constructor(platforms) {
        this.platforms = platforms;
    }

    render () {
        for ( let platform of this.platforms ) {
            platform.draw();
        }

    }


}