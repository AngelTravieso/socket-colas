const path = require('path');
const fs = require('fs');

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    // Getter para retornar objeto con datos de los tickets
    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    // Inicialiar lógica de los tickets
    init() {
        const {
            hoy,
            tickets,
            ultimos4,
            ultimo
        } = require('../db/data.json');

        // Estamos trabajando en el mismo dia
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia
            this.guardarDB();
        }
    }

    // Guardar archivo JSON con datos de los tickets
    guardarDB() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));

    }

}

module.exports = TicketControl;