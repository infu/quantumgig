
import { CallResult, Service, serviceQuery, serviceUpdate,Variant,Record,Vec } from 'azle';

export type Error = Variant<{
    InvalidCanister : null,
    CanisterError : CanisterError
}>;

export type CanisterError = Record<{
    message : string;
}>;

export type ExecutionResult = Variant<{
    Ok : null,
    Err : Error
}>;

export type QueryResult = Variant<{
    Ok : Vec<Vec<string>>;
    Err : Error;
}>;

export class SqlCanister extends Service {
    @serviceQuery
    query: (message: string) => CallResult<QueryResult>;

    @serviceUpdate
    execute: (message: string) => CallResult<ExecutionResult>;
}