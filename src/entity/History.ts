import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({
        type: 'text',
        transformer: {
            to(d) {
                return JSON.stringify(d);
            },
            from(d) {
                return JSON.parse(d);
            }
        }
    })
    data: string;

    @Column()
    created_at: string;

    @ManyToOne(() => User, (user: User) => user.history)
    @JoinColumn({name: "user_id"})
    user: Promise<User>
}
