import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql/language';
import { GraphQLError } from 'graphql';

@Scalar('Email', type => String)
export class EmailScalar implements CustomScalar<string, String> {
    description = 'Email custom scalar type';

    parseValue(value: string): string {
        return value;
    }

    serialize(value: string): string {
        return value;
    }

    parseLiteral(ast: ValueNode): string {
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
}