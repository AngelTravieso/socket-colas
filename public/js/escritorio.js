// * Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');


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

// Ocultar alerta
divAlerta.style.dislay = 'none';


// * SOCKETS

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

    socket.emit('atender-ticket',{ escritorio }, ( { ok, ticket, msg } ) => {
        // Si es false (no hay tickets o hubo algun error)
        if(!ok) {
            lblTicket.textContent = 'Nadie.';
            // Mostrar div alerta 'No hay más tickets'
            return divAlerta.style.display = '';
        }

        lblTicket.textContent = `Ticket ${ticket.numero}`;
    });

});