const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat')
require('dotenv').config();

// Websocket server
const http = require('http');
const WebSocket = require('ws');
const WebSocketServer = new WebSocket.Server({
    server: http.createServer().listen(3000)
});

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

//Bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));

//Router
app.use('/', indexRouter);
app.use('/chat', chatRouter)

// Log ra màn hình console khi server được chạy
console.log(`Server running at http://localhost:${process.env.PORT}/`);

// Khi có một kết nối được mở giữa client và server
WebSocketServer.on('connection', function (ws) {
    console.log('Có một kết nối đã được mở giữa client và server');
    // Khi server nhận được message từ client
    ws.on('message', function (message) {
        //TODO: Xử lý message tại đây

        console.log('Server nhận được message từ client: ' + message);
        WebSocketServer.clients.forEach(function each(client) { // Duyệt qua tất cả các client đang kết nối
            if (client.readyState === WebSocket.OPEN) { // Kiểm tra xem client có đang mở kết nối hay không
                if (client !== ws) { // Kiểm tra xem client có phải là client gửi tin nhắn không
                    client.send(message);
                }
            }
        });
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
