// * REFERENCIAS HTML
lblTicket1 = document.querySelector('#lblTicket1');
lblEscritorio1 = document.querySelector('#lblEscritorio1');
lblTicket2 = document.querySelector('#lblTicket2');
lblEscritorio2 = document.querySelector('#lblEscritorio2');
lblTicket3 = document.querySelector('#lblTicket3');
lblEscritorio3 = document.querySelector('#lblEscritorio3');
lblTicket4 = document.querySelector('#lblTicket4');
lblEscritorio4 = document.querySelector('#lblEscritorio4');

// * SOCKETS

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

// Escuchar mensaje ultimos 4 tickets
socket.on('estado-actual', (payload) => {

    // Audio para reproducir
    const audio = new Audio('./audio/new-ticket.mp3');

    // Reproducir audio cuando se va a atender el siguiente ticket
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;

    // Si no hay ticket
    if (ticket1) {
        lblTicket1.textContent = `Ticket ${ticket1.numero}`;
        lblEscritorio1.textContent = ticket1.escritorio;
    }

    if (ticket2) {
        lblTicket2.textContent = `Ticket ${ticket2.numero}`;
        lblEscritorio2.textContent = ticket2.escritorio;
    }

    if (ticket3) {
        lblTicket3.textContent = `Ticket ${ticket3.numero}`;
        lblEscritorio3.textContent = ticket3.escritorio;
    }

    if (ticket4) {
        lblTicket4.textContent = `Ticket ${ticket4.numero}`;
        lblEscritorio4.textContent = ticket4.escritorio;
    }

});

