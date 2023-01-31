const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Cuando un cliente seconecta

    // Emitir evento - ultimo ticket
    socket.emit('ultimo-ticket', `Ticket ${ticketControl.ultimo}`);

    // Ultimo 4 tickets
    socket.emit('estado-actual', ticketControl.ultimos4);

    // Tickets pendientes (emit normal)
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    // Escuchar evento - siguiente ticket
    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguiente();

        // Enviar datos siguiente ticket
        callback(siguiente);

        // Emiti tickets pendientes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });

    // Escuchar
    socket.on('atender-ticket', ({ escritorio }, callback) => {

        // Si no llega el nombre del escritorio
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // Los ultimos 4 cambiaron y se notifica otra vez ( a las demas pantallas )
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        // Tickets pendientes (broadcast)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        // Tickets pendientes (emit normal)
        socket.emit('tickets-pendientes', ticketControl.tickets.length);

        // No hay tickets pendientes
        if (!ticket) {
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