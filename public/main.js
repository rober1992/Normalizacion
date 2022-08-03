


const chatMessages = document.querySelector('.chat-messages');

const socket = io.connect();

socket.emit('askData');

function renderMsg(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="user-info">
    <p class="meta">${message.author.email}</p> <span class="time-right"> ${message.author.alias}</span>
    </div>
    <p class="text-msg"> ${message.text} </p>`;

     chatMessages.appendChild(div);
}

const formMensaje = document.getElementById('msgForm');

formMensaje.addEventListener('submit', (event) => {
    event.preventDefault();
    if (email.value && msg.value) {
      let data = {
        author: {
          email: email.value,
          nombre: nombre.value,
          apellido: apellido.value,
          alias: alias.value,
          edad: edad.value,
          avatar: avatar.value,
        },
        msg: msg.value,
        timestamp : Date.now()
      };
      console.log('EMITIENDO SOCKET');
  
      socket.emit('new-message', data);
      email.value = '';
      nombre.value = '';
      apellido.value = '';
      (alias.value = ''), (edad.value = ''), (avatar.value = '');
      msg.value = '';
    }
});
  

socket.on('messages', function (data) { 
    const author = new normalizr.schema.Entity('author',{}, {idAttribute : 'email'});

    const msg = new normalizr.schema.Entity(
        'message',
        {
            author : author
        },
        { idAttribute : '_id'}
    );

    const msgesSchema = new normalizr.schema.Array(msg);

    const denormalizedData = normalizr.denormalize(data.result, msgesSchema, data.entities);
    console.log('RENDERIZANDO DATA');
  
    if(denormalizedData != undefined) {
        console.log(denormalizedData);
        denormalizedData.forEach((msg) => {
            renderMsg(msg); 
        });
    };
});