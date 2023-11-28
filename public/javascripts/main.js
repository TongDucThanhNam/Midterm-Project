console.log("Main.js")

const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function () {
    console.log('Client connection opened');
}

socket.onmessage = function (message) {
    console.log('Client received a message', message);
    let html = '<li class="d-flex justify-content-between mb-4">\n' +
        '                    <div class="card">\n' +
        '                        <div class="card-header d-flex justify-content-between bg-primary-subtle h-50">\n' +
        '                            <p>Trọng Kiên</p>\n' +
        '                            <p>12 minute ago</p>\n' +
        '                        </div>\n' +
        '                        <div class="card-body">\n' +
        '                            <p class="card-text">Some quick example text to build on the card title and make up the\n' +
        '                                bulk of the card\'s content.</p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <img src="/images/user2.png" width="60" height="60">\n' +
        '                </li>'
    $('#messages').append(html);

}

socket.onclose = function () {
    console.log('Client connection closed');
}

$('#send').click(function () {
    console.log('Client send a message');
    socket.send($('#message').val());
    $('#message').val('');
});

