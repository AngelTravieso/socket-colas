const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Emitir evento - ultimo ticket
    socket.emit('ultimo-ticket', `Ticket ${ticketControl.ultimo}`);

    // Escuchar evento - siguiente ticket
    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguiente();

        console.log(siguiente);

        callback(siguiente);

        // TODO: Notificar que hay un nuevo ticket pendiente de asignar

    });

    // Escuchar
    socket.on('atender-ticket', ({ escritorio }, callback) => {

        // Si no llega el nombre del escritorio
        if(!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // TODO: Notificar cambio en los ultimos 4 tickets

        // No hay tickets pendientes
        if(!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes',
            });
        } else {
            callback({
                ok: true,
                ticket,
            });
        }

    });

}



module.exports = {
    socketController
}