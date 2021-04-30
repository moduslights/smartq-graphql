import {sign, verify} from "jsonwebtoken";
import { Request } from "express";
import {User} from "../entities/user.entity";
import {ApolloError, AuthenticationError} from "apollo-server-express";


export const createAccessToken = (user: User) => {
    return sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m"
    });
};

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d"
        }
    );
};

export const getPayloadFromToken = (req: Request) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
        return undefined;
        //throw new Error("not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return payload as any;

    } catch (err) {
        console.log(err.message);
        throw new AuthenticationError(err.message);
    }
};