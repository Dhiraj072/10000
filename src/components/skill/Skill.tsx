import React from 'react';
import { Card, H3, H4 } from "@blueprintjs/core";
import { ISkill } from "../../common/types";

export const Skill: React.FC<ISkill> = (props) => {
    const { name, description, targetHours, achievedHours, startDate } = props;
    return (
        <Card>
            <H3>{name}</H3>
            <H4>{achievedHours}/{targetHours} target hours achieved</H4>
        </Card>
    )
}