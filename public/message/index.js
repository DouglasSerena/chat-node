function message(message, type = 'secondary') {
    const div = document.createElement('p');
    div.classList.add('message');
    div.classList.add(`bg-${type}`);
    div.textContent = message;
    document.querySelector('body').append(div);
    setTimeout(() => {
        div.classList.add('close-message');
        setTimeout(() => {
            div.remove();
        }, 500);
    }, 3000);
}
