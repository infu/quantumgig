import {
    CanisterResult,
    ExternalCanister,
    query,
    update,Variant
} from 'azle';

export type Error = Variant<{
    InvalidCanister : null,
    CanisterError : CanisterError
}>;

export type CanisterError = Variant<{
    message : string;
}>;

export type ExecutionResult = Variant<{
    ok : null,
    err : Error
}>;

export type QueryResult = Variant<{
    ok : string[][];
    err : Error;
}>;

export class SqlCanister extends ExternalCanister {
    @query
    query: (message: string) => CanisterResult<QueryResult>;

    @update
    execute: (message: string) => CanisterResult<ExecutionResult>;
}