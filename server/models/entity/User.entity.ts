import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ name: "id_role", type: "int" })
    idRole: number | undefined;

    @Column({ name: "email", type: "varchar", length: "100" })
    email: string | undefined;
}