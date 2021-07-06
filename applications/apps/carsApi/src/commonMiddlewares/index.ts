
import helmet from "helmet";
import cusrf from "csurf"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const csrfProtection = cusrf({ cookie: true })
import expressRateLimit from "express-rate-limit"

const ipLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
});

const commonMiddlewares = [];
commonMiddlewares.push((req, res, next) => { console.log("firstMiddleware"); next() })
commonMiddlewares.push((req, res, next) => { console.log("secondMiddleware"); next() })
commonMiddlewares.push((req, res, next) => { console.log("thirdMiddleware"); next() })
commonMiddlewares.push(helmet())
commonMiddlewares.push(cookieParser())
commonMiddlewares.push(bodyParser.urlencoded({ extended: false }))
commonMiddlewares.push(bodyParser.json())
commonMiddlewares.push(ipLimiter)

export { commonMiddlewares };