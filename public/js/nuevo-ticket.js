// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});

// Escuchar mensaje de ultimo ticket
socket.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.textContent = ticket;
});

// Siguiente ticket
btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.textContent = ticket;
    });

});