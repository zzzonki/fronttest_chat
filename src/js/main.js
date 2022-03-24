let chatbox = document.querySelector('.chat-box'),
    input = document.querySelector('.input__text'),
    form = document.querySelector('.mes-form'),
    emoji = document.querySelector('.input__emoji'),
    emoji_field = document.querySelector('.emoji-list'),
    select = document.querySelector('.select'),
    select_header = document.querySelector('.select__header'),
    select_items = document.querySelectorAll('.select__item'),
    select_current = document.querySelector('.select__current'),
    select_content = document.querySelector('.select__content'),
    input_img = document.querySelector('#input-img');

let messages = [];

let flag = true;

select_header.addEventListener('click', () => {
    select_content.classList.add('animated');

    if (flag) {
        select_content.classList.remove('fade-out-up');
        select_content.classList.add('fade-in-down');
        select.classList.toggle('active');

        flag = false;
    } else {
        select_content.classList.remove('fade-in-down');
        select_content.classList.add('fade-out-up');
        select.classList.remove('active');

        flag = true;
    }
});

select_items.forEach((item) => {
    item.addEventListener('click', () => {
        select_content.classList.remove('fade-in-down');
        select_content.classList.add('fade-out-up');
        select.classList.remove('active');

        flag = true;

        select_current.innerText = item.innerText;
    });
});

let socket = new WebSocket(
    'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self'
);

socket.onopen = function (event) {
    console.log('opened');
    socket.send('opened');
};

socket.onmessage = (event) => {
    let message = {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam odio quam blanditiis natus, deserunt voluptates, harum provident laboriosam nihil autem eum, pariatur nemo nostrum! Doloremque expedita quis non facere voluptate.',
        time: new Date(),
        inc: true,
    };
    sendMessage(message);
};

socket.onclose = function (event) {
    console.log('closed');
};

input_img.addEventListener('change', (event) => {
    event.preventDefault();
    
    let photo = event.target.files[0];

    if (!photo.type.match('image.*')) {
        return;
    }

    let FR = new FileReader();

    FR.onload = function (event) {
        chatbox.insertAdjacentHTML(
            'beforeEnd',
            '<div class="message message_sent"><div class="message__text"><img class="message__img" src="' +
                event.target.result +
                '" alt=""></div><svg class="icon-check" viewBox="0 0 24 24"><use xlink:href="./icons/sprite.svg#icon-check" /></svg></div>'
        );
        chatbox.lastChild.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        });
    };

    FR.readAsDataURL(photo);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (input.value) {
        let message = {
            text: input.value,
            time: new Date(),
            inc: false,
        };
        sendMessage(message);
    }
});

emoji.addEventListener('click', () => {
    emoji_field.classList.toggle('hidden');
    input.focus();
});

function insertSmile(smile) {
    input.value += smile;
    input.focus();
}

function sendMessage(message) {
    messages.push(message);

    if (message.inc) {
        chatbox.insertAdjacentHTML(
            'beforeEnd',
            '<div class="message message_inc"><div class="message__avatar avatar"><svg class="icon-face" viewBox="0 0 50 50"><use xlink:href="./icons/sprite.svg#icon-face" /></svg></div><div class="message__text"><span>' +
                messages[messages.length - 1].text +
                '</span></div></div>'
        );
    } else {
        input.value = '';
        chatbox.insertAdjacentHTML(
            'beforeEnd',
            '<div class="message message_sent"><div class="message__text"><span>' +
                messages[messages.length - 1].text +
                '</span></div><svg class="icon-check" viewBox="0 0 24 24"><use xlink:href="./icons/sprite.svg#icon-check" /></svg></div>'
        );
        console.log(messages);
        chatbox.lastChild.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        });
    }
}
