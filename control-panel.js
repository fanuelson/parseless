'use strict';

var ControlPanel = (function() {
    var data = {
        general: {},
        units: {
            attackers: [],
            miners: []
        }
    };

    function ControlPanel(name) {
        data.general.name = name;
        data.general.fuel = "10000";
        data.general.maxFuel = "10000";
    };

    ControlPanel.prototype.on = function(event, callback) {
        // lista de eventos (separar por tipo de unit)

        // unitAttacked
        // enemySpotted
        // unitDestroyed
        // unitReady
        // enemyDestroyed
        // fuelLoaded
        // lowFuel
    };

    ControlPanel.prototype.do = function(action) {
        // lista de acoes (separar por tipo de unit)

        // createAttacker
        // createMiner
    };

    ControlPanel.prototype.data = function() {
        return data;
    };
    return ControlPanel;
}());

function run() {
    var cp = new ControlPanel("RUBENS");
    console.log(cp.data());
};

run();