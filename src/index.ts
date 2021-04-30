import {ApolloServer, ApolloError, AuthenticationError} from "apollo-server-express";
import "reflect-metadata";
import path from "path";
import express from "express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers";
import {RoleResolver} from "./resolvers/role";
import {UserResolver} from "./resolvers/user";
import cookieParser from "cookie-parser";
import {__prod__} from "./constants";
import {MyContext} from "./types";
import cors from 'cors';
const bodyParser = require('body-parser')
import "dotenv-safe/config"
import {createConnection } from "typeorm"
import { sendRefreshToken } from "./authentication/sendRefreshToken";
import {createAccessToken, createRefreshToken, getPayloadFromToken} from "./authentication/auth";
import { verify } from "jsonwebtoken";
import {User} from "./entities/user.entity";
import {authChecker} from "./authentication/auth-checker";
import {GraphQLError} from "graphql";


const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        //synchronize: true,
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        migrations: [path.join(__dirname, "./migrations/*")],
     // migrationsRun: true
    })
    await conn.runMigrations();

    const app = express();

    //app.set("proxy", 1);
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))
    app.use(cookieParser());


    //Authentication code
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }

        // token is valid and
        // we can send back an access token
        const user = await User.findOne(payload.userId);

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, RoleResolver, UserResolver],
            authChecker,
            validate: false,
        }),
        formatError: (err: GraphQLError) => {
            if (err.name === "AuthenticationError") {
                return new AuthenticationError(err.message);
            }
            if (err.message === "Access denied! You don't have permission to perform this action!") {
                return new ApolloError("Access denied! You don't have permission to perform this action!", "UNAUTHORIZED");
            }
            return err;
        },
        context ({req, res}): MyContext {
            const payload =  getPayloadFromToken(req)

            return {req, res, payload}
        },
    });


    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    app.get("/node/server", (req, res) => {
        return res.send("Hello World");
    });

    app.post("/node/server", (req, res) => {
        console.log(req.body)
        return res.status(200).send({"Status" : "Received"});
    });

    server.applyMiddleware({app, cors: false});

    app.listen(parseInt(process.env.PORT as string), () =>
        console.log(`server running at localhost:${process.env.PORT}/graphql`)
    );
};

    main().catch((err) => {
        console.error(err);
    });
