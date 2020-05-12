"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const language_1 = require("graphql/language");
const graphql_2 = require("graphql");
let EmailScalar = class EmailScalar {
    constructor() {
        this.description = 'Email custom scalar type';
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        if (ast.kind !== language_1.Kind.STRING) {
            throw new graphql_2.GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
        }
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!re.test(ast.value)) {
            throw new graphql_2.GraphQLError('Query error: Not a valid Email', [ast]);
        }
        return ast.value;
    }
};
EmailScalar = __decorate([
    graphql_1.Scalar('Email', type => String)
], EmailScalar);
exports.EmailScalar = EmailScalar;
//# sourceMappingURL=email.scalar.js.map