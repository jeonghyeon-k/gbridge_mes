// Node.JS 내외부 모듈추출
const   express = require('express');
const   cookieParser = require('cookie-parser');
const   session = require('express-session');
const   bodyParser = require('body-parser');
const   createError = require('http-errors');
const   path = require('path');
const   app = express();
const   mysql = require('mysql');

const   db = mysql.createConnection({
  host: 'localhost',        // DB서버 IP주소
  port: 3306,               // DB서버 Port주소
  user: 'root',            // DB접속 아이디
  password: 'gachon654321',  // DB암호
  database: 'bridge'         //사용할 DB명
});


//개발소스 모듈
const   main = require('./routes/main');
const   users = require('./routes/users');
const   step = require('./routes/step');
const   orders = require('./routes/orders');
const   status = require('./routes/status');
const   system = require('./routes/system');

// 실행환경 설정부분
app.set('views', path.join(__dirname, 'views'));  // views경로 설정
app.set('view engine', 'ejs');                    // view엔진 지정
app.use(express.static(path.join(__dirname, 'public')));   // public설정
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ key: 'sid',
                  secret: 'secret key',  // 세션id 암호화할때 사용
                  resave: false,         // 접속할때마다 id부여금지
                  saveUninitialized: true })); // 세션id사용전에는 발급금지


                  
// URI와 핸들러를 매핑
app.use('/', main);
app.use('/users', users);
app.use('/step', step); 
app.use('/orders', orders);
app.use('/status', status);
app.use('/system', system);



const port = 3000;
app.listen(port, function(){
  console.log(`app listening at http://localhost:${port}`);
});
  


