import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import {History} from "./History";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column()
    created_at: string;

    @OneToMany('History', (history: History) => history.user, { nullable: true})
    @JoinColumn({name: 'user_id'})
    history: Promise<History[]>;
}