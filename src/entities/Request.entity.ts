import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { RequestStatusEnum } from "../commons/enums";

@Entity("request")
export class RequestEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column()
  message: string;

  @Column({ enum: RequestStatusEnum, default: RequestStatusEnum.NEW })
  status: RequestStatusEnum;

  @Column({ nullable: true })
  reason_cancelled: string;

  @Column({ nullable: true })
  text_answer: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

}