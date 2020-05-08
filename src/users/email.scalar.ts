import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export var Email = new GraphQLScalarType({
    name: 'Email',
    serialize: value => {
        return value;
    },
    parseValue: value => {
        return value;
    },
    parseLiteral: ast => {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
        }

        // Regex taken from: http://stackoverflow.com/a/46181/761555
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!re.test(ast.value)) {
            throw new GraphQLError('Query error: Not a valid Email', [ast]);
        }

        return ast.value;
    }
});