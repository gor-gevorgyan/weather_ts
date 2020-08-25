import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


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
}
