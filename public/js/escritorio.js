// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');


const searchParams = new URLSearchParams(window.location.search);

// Si en la URL no está el parámetro de 'escritorio'
if (!searchParams.has('escritorio')) {
    // redireccionar al index
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

// Obtener valor del queryParam
const escritorio = searchParams.get('escritorio');
lblEscritorio.textContent = escritorio;


const socket = io();

socket.on('connect', () => {
    console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

// Escuchar mensaje de ultimo ticket
socket.on('ultimo-ticket', (ticket) => {
    // lblNuevoTicket.textContent = ticket;
});

// Siguiente ticket
btnAtender.addEventListener('click', () => {

    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     lblNuevoTicket.textContent = ticket;
    // });

});



console.log(escritorio);