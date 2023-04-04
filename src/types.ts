import { Document } from "mongoose";

export interface Category extends Document {
    name: string;
    description: string;
    nomineesNumber: number;
    type: string;
}

export interface User extends Document {
    role: string;
    code: string;
}

export interface Student extends Document {
    name: string;
    category: string;
    votes: number;
}

export interface Teacher extends Document {
    name: string;
    category: string;
    votes: number;
}