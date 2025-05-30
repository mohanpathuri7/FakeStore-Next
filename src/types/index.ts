export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: number;
    email: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    token?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface CheckoutSession {
    id: string;
    url: string;
}

export interface OrderDetails {
    email: string;
    name: string;
    address: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    phone: string;
}