import {Authority} from "../entities/authority.entity";

export default class AuthorityService {

    public async getAll(): Promise<Authority[] | undefined>{
        return Authority.find();
    }

    public async create(roles: string[]): Promise<Authority[] | undefined>{
        const authorities: any = [];

        for (const name of roles) {
            authorities.push(await Authority.create({name}).save());
        }
        await authorities;
        return authorities;
    }

    public async findRole(id: string): Promise<Authority | undefined> {
        return  Authority.findOne(id);
    }

    public async findRoles(ids: string[]): Promise<Authority[]> {
        return Authority.findByIds(ids);
    }

    public async update(id: string, name: string): Promise<Authority | undefined> {
        const role = await Authority.findOne(id);
        if (!role) {
            return undefined;
        }
        if (typeof name !== undefined) {
            role.name = name;
            await Authority.update({id}, {name})
        }
        return role;
    }

    public async delete(roleId: string): Promise<boolean> {
        await Authority.delete(roleId);
        return true;
    }
}