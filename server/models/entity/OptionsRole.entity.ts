import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("options_roles")
export class OptionsRoleEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ name: "id_role", type: "int" })
    idRole: number | undefined;

    @Column({ name: "title", type: "varchar", length: "25" })
    title: string | undefined;

    @Column({ name: "url", type: "varchar", length: "40" })
    url: string | undefined;

    @Column({ name: "mui_icon", type: "varchar", length: "40" })
    muiIcon: string | undefined;
}