import { Document } from 'mongoose';

export interface Player extends Document {
    readonly email: string;
    name: string;
    phoneNumber: string;
    ranking: string;
    rankingPosition: number;
    picture: string;
}