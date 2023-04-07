import { $query, $update, Principal, ok, Variant } from 'azle';
import { Error,  QueryResult, SqlCanister} from './types/SqlCanister';

// This is a global variable that is stored on the heap
let message: string = '';

const sql = new SqlCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

$update;
export async function test(): Promise<void> {
    let r = await sql.query("SELECT * FROM user LIMIT 10").call();
    console.log(r)
    
}

// Query calls complete quickly because they do not go through consensus
$query;
export function get_message(): string {
    return message;
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function set_message(new_message: string): void {
    message = new_message; // This change will be persisted
}
