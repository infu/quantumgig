import { $query, $update, Principal, Variant } from 'azle';
import { Error,  QueryResult, SqlCanister} from './types/SqlCanister';

const sql = new SqlCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

async function query(message: string): Promise<string[][] | undefined> {
    let r = await sql.query(message).call();
    if (r.Err) {
        console.log("error", r.Err);
        throw r.Err;
    }
    else {
        return r.Ok?.Ok;       
    }
}

export default {
    query
}