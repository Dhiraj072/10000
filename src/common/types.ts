import { Moment } from "moment";

export interface ISkill {
    name: string,
    description?: string,
    targetHours: number,
    achievedHours: number,
    startDate?: number
}