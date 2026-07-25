class TestGraphicalModule extends GraphicalModule {

    constructor() {
        super('TG');
    }

    activate(caller) {
        this.introText = 'LOADING TEST GM';
    }

    getHeight() {
        return 100;
    }

    fireMouseClick(x, y, event) {
        alert('hello dolly');
    }

    createDrawer() {

        var ret = super.createDrawer();
        ret.draw = function (drawer) {
            var color = '#FF33CC';
            drawer.drawBackground(color, color);
            color = '#333333';
            drawer.setFillStyle(color);

            for (var prop in this.events) {
                var event = this.events[prop];
                drawer.fillRect(event.x, event.y, 5, 5);

            }




        };

        ret.events = [];

        ret.fireMouseEvent = function (x, y, event)
        {
            this.events.push({
                x: x,
                y: y
            });

        };
        return ret;
    }

}