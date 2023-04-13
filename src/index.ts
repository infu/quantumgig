import { $query, $update, Principal, Variant,Record, nat, Vec } from 'azle';
import sql from './sql';
import { log} from './utils';
// This is a global variable that is stored on the heap
let message: string = '';

 type SqlResponse = Record<{
     columns: Vec<string>;
     data: Vec<Vec<string>>;
}>;

$update; // These will become query once Azle has SQL plugin
export async function get_categories(): Promise<SqlResponse> {
    let r = await sql.query(`SELECT id, name, parent_id, image_url FROM categories`);

    return {
        columns: [ "id", "name", "parent_id", "image_url" ], // Cumbersome having to add these explicitly
        data: r || []  
    }
}


$update;
export async function search_services(term : string): Promise<SqlResponse> {
    let r = await sql.query(`
    SELECT s.id, s.user_id, s.category_id, s.avg_completion_time, s.completed_count, s.title,  s.price, s.image_url, s.rating, s.total_ratings, s.created_at, u.rating as user_rating, u.total_ratings as user_total_ratings, u.image_url as user_img, u.username as user_name
    FROM services AS s
    JOIN services_search AS ss ON s.id = ss.id
    JOIN users AS u ON s.user_id = u.id
    WHERE ss.title MATCH '${term}' ORDER BY s.rating DESC LIMIT 20`);

    return {
        columns: [
            "id", "user_id", "category_id",
            "avg_completion_time", "completed_count", "title",  "price",
            "image_url", "rating", "total_ratings", "created_at", "user_rating", "user_total_ratings", "user_img", "user_name"
        ],
        data: r || []  
    }
}




$update;
export async function get_user_info(id : nat): Promise<SqlResponse> {
    let r = await sql.query(`SELECT username, rating, total_ratings, created_at, last_logged_in, about, image_url FROM users WHERE id = ${id} LIMIT 1`);

    return {
        columns: [
            "username", "rating", "total_ratings", "created_at", "last_logged_in", "about", "image_url"
        ],
        data: r || []  
    }
}


$update;
export async function get_order(id : nat): Promise<SqlResponse> {
    let r = await sql.query(`SELECT service_id, prompt, buyer_id, seller_id, status, chat, rated, created_at, updated_at, price, completed_at
    FROM orders
    WHERE id = ${id} LIMIT 1`);

    return {
        columns: [
            "service_id", "prompt", "buyer_id", "seller_id", "status", "chat", "rated", "created_at", "updated_at", "price", "completed_at"
        ],
        data: r || []  
    }
}


$update;
export async function get_service(id : nat): Promise<SqlResponse> {
    let r = await sql.query(`SELECT services.id, services.user_id, services.category_id, services.is_available,  services.avg_completion_time, services.completed_count, services.title, services.description, services.price, services.image_url, services.rating, services.total_ratings, services.created_at, users.rating as user_rating, users.total_ratings as user_total_ratings, users.image_url as user_img, users.username as user_name, users.about as user_about, services.gallery
    FROM services LEFT JOIN users ON users.id = services.user_id
    WHERE services.id = ${id} LIMIT 1`);

    return {
        columns: [
            "id", "user_id", "category_id", "is_available", 
            "avg_completion_time", "completed_count", "title", "description", "price",
            "image_url", "rating", "total_ratings", "created_at", "user_rating", "user_total_ratings", "user_img", "user_name", "user_about","gallery"
        ],
        data: r || []  
    }
}

$update;
export async function get_user_services(user_id: nat): Promise<SqlResponse> {
    let r = await sql.query(`SELECT services.id, services.user_id, services.category_id, services.is_available,  services.avg_completion_time, services.completed_count, services.title, services.price, services.image_url, services.rating, services.total_ratings, services.created_at
    FROM services
    WHERE services.is_available = 1 AND user_id = ${user_id}
    ORDER BY services.completed_count DESC LIMIT 20`);

    return {
        columns: [
            "id", "user_id", "category_id", "is_available", 
            "avg_completion_time", "completed_count", "title",  "price",
            "image_url", "rating", "total_ratings", "created_at"
        ],
        data: r || []  
    }
}

$update;
export async function get_category_services(category_id: nat): Promise<SqlResponse> {
    let r = await sql.query(`SELECT services.id, services.user_id, services.category_id, services.is_available,  services.avg_completion_time, services.completed_count, services.title, services.price, services.image_url, services.rating, services.total_ratings, services.created_at, users.rating as user_rating, users.total_ratings as user_total_ratings, users.image_url as user_img, users.username as user_name
    FROM services LEFT JOIN users ON users.id = services.user_id
    WHERE services.is_available = 1 AND category_id = ${category_id}
    ORDER BY services.completed_count DESC LIMIT 20`);

    return {
        columns: [
            "id", "user_id", "category_id", "is_available", 
            "avg_completion_time", "completed_count", "title",  "price",
            "image_url", "rating", "total_ratings", "created_at", "user_rating", "user_total_ratings", "user_img", "user_name",
        ],
        data: r || []  
    }
}

$update;
export async function get_top_services(): Promise<SqlResponse> {
    let r = await sql.query(`SELECT services.id, services.user_id, services.category_id, services.is_available,  services.avg_completion_time, services.completed_count, services.title,  services.price, services.image_url, services.rating, services.total_ratings, services.created_at, users.rating as user_rating, users.total_ratings as user_total_ratings, users.image_url as user_img, users.username as user_name
    FROM services LEFT JOIN users ON users.id = services.user_id
    WHERE services.rating > 7 AND services.is_available = 1
    ORDER BY services.completed_count DESC LIMIT 20`);

    return {
        columns: [
            "id", "user_id", "category_id", "is_available", 
            "avg_completion_time", "completed_count", "title","price",
            "image_url", "rating", "total_ratings", "created_at", "user_rating", "user_total_ratings", "user_img", "user_name",
        ],
        data: r || []  
    }
      
}

$update;
export async function get_stats_users(): Promise<SqlResponse> {
    let r = await sql.query(`SELECT count(*) as total from users`)
    return {
        columns: [
            "total"
        ],
        data: r || []  
    }
}

$update;
export async function get_stats_services(): Promise<SqlResponse> {
    let r = await sql.query(`SELECT count(*) as total from services`)
    return {
        columns: [
            "total"
        ],
        data: r || []  
    }
}


$update;
export async function get_stats_orders(): Promise<SqlResponse> {
    let r = await sql.query(`SELECT status, count(*) as total from orders GROUP BY status`)
    return {
        columns: [
            "status", "total"
        ],
        data: r || []  
    }
}




$update;
export async function get_top_providers(): Promise<SqlResponse> {
    let r = await sql.query(`SELECT id, username, rating, total_ratings, image_url FROM users WHERE total_ratings > 10 ORDER BY rating DESC`)
    return {
        columns: [
            "id", "username", "rating", "total_ratings", "image_url"
        ],
        data: r || []  
    }
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



