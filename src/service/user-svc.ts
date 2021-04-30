import argon2 from "argon2";
import {UserRegister} from "./inputeType/user-register";
import {UserResponse} from "./responseType/user-response";
import {UserLogin} from "./inputeType/user-login";
import {Request, Response} from "express";
import { hash, compare } from "bcryptjs";
import {User} from "../entities/user.entity";
import {Authority} from "../entities/authority.entity";
import {sendRefreshToken} from "../authentication/sendRefreshToken";
import {createAccessToken, createRefreshToken} from "../authentication/auth";
import AuthorityService from "./authority-svc";


export default class UserService {

    private readonly authorityService = new AuthorityService();

    public async getAllUsers(): Promise<User[] | undefined>{
       return User.find();
    }

    public async getUserByEmail( email: string): Promise<User | undefined>{
       const user =  await User.findOne({ email });
       return  user;
    }

    public async getUserByID( id: string): Promise<UserResponse>{
        const user =  await User.findOne(id);

        if (!user) {
            return { user: undefined};
        }
        return {user};
    }

    public async getUserFromPayload( payload: any): Promise<User | undefined>{
        if (!payload?.email) {
            return undefined;
        }
        return  this.getUserByEmail(payload.email);
    }

    public async addUserRole(rolesIds: string[], id: string): Promise<UserResponse>{
        const roles = await this.authorityService.findRoles(rolesIds)
        const {user} =  await this.getUserByID(id)
        if(!user) {
            return { user: undefined};
        }
        for (const role of roles) {
            const userRoles = user.linkedEntities.roles;
            if(this.getFind(userRoles, role)) {
                continue
            }
            userRoles.push(role.name);
        }
        return { user: await user.save()};
    }

    private getFind(userRoles: string[], role: Authority) {
        return userRoles.find(r => r === role.name);
    }

    public async removeUserRole(rolesIds: string[], id: string): Promise<UserResponse>{
        const roles = await this.authorityService.findRoles(rolesIds)
        const {user} =  await this.getUserByID(id)
        if(!user) {
            return { user: undefined};
        }
        for (const role of roles) {
            user.linkedEntities.roles = user?.linkedEntities.roles.filter(r => r !== role.name);
        }
        return { user: await user.save()};
    }

    // public async update(userId: number, ): Promise<User | null>{
    //     const user = await this.userRepository.findByPk(userId);
    //     if (!user) {
    //         return null;
    //     }
    //     if (typeof name !== undefined) {
    //         user.name = name;
    //     }
    //     return user.save();
    // }

    public async login(res: Response, email: string, password: string): Promise<UserResponse> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "Email doesn't exist",
                    },
                ],
            };
        }
        const valid = await compare(password, user.password);

        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect passwords",
                    },
                ],
            };
        }

        // login successful
        sendRefreshToken(res, createRefreshToken(user));
        return {
            accessToken: createAccessToken(user),
            user
        };
    }
    public async register( {firstName, lastName, email, password, phone} : UserRegister): Promise<UserResponse>{
        try {
            const foundUser = await User.findOne({ where: { email } });
            if (foundUser) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: `Email ${email} already exists`,
                        },
                    ],
                };
            }

            const hashedPassword = await hash(password, 12);
            const user = await User.create({
                password: hashedPassword,
                firstName,
                lastName,
                email,
                phone,
                activated: false,
                langKey: 'en',
                createdBy: email,
                lastModifiedBy: email,
                linkedEntities: {roles: ["USER"]}
            }).save()

            return {user};
        } catch (err) {
            console.log("Error message ", err.detail);
            return {
                errors: [
                    {
                        field: err.detail,
                        message: "Unable to register the user, please try again",
                    },
                ],
            };
        }
    }
}