import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable} from "typeorm";
import {History} from "./History";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column()
    created_at: string;

    @OneToMany(type => History, history => history.user_id, { nullable: true })
    // @JoinColumn({name: 'user_id'})
        @JoinTable({
        name: 'history',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
    })
    history: Promise<History[]> | History[];
}