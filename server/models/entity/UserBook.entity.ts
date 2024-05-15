import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_book")
export class UserBookEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ name: "id_user", type: "int" })
    idUser: number | undefined;

    @Column({ name: "id_book", type: "int" })
    idBook: number | undefined;

    @Column({ name: "quantity", type: "int" })
    quantity: number | undefined;

    @Column({ name: "finish", type: "varchar", length: 50 })
    finish: string | undefined;
}