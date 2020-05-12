"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_input_1 = require("./inputs/user.input");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async users(skip = 0, limit = 10) {
        return this.usersService.findAll(skip, limit);
    }
    async user(id) {
        return this.usersService.findById(id);
    }
    async createUser(input) {
        return this.usersService.create(input);
    }
    async updateUser(id, input) {
        return this.usersService.update(id, input);
    }
    async deleteUser(id) {
        return this.usersService.delete(id);
    }
};
__decorate([
    graphql_1.Query(() => [create_user_dto_1.User]),
    __param(0, graphql_1.Args('skip', { type: () => graphql_1.Int })),
    __param(1, graphql_1.Args('limit', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "users", null);
__decorate([
    graphql_1.Query(() => create_user_dto_1.User),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "user", null);
__decorate([
    graphql_1.Mutation(() => create_user_dto_1.User),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Mutation(() => create_user_dto_1.User),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    graphql_1.Mutation(() => create_user_dto_1.User),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
UsersResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map