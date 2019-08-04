import React, { useState } from 'react';
import { Card, H3, H4, H2, FormGroup, H5, Button, NumericInput } from "@blueprintjs/core";
import { ISkill } from "../../common/types";
import moment from 'moment';
import { updateSkill } from '../../firebase/firebase';

interface SkillProps {
    skillId: string,
    skill: ISkill
}

export const Skill: React.FC<SkillProps> = (props) => {
    const [summaryOnly, setSummaryOnly] = useState<boolean>(true);
    const [skill, setSkill] = useState<ISkill>(props.skill);
    const { name, description, targetHours, achievedHours, startDate } = skill;
    const handleAchievedHrsChange = (valNum: number, valStr: string) => {
        setSkill({ ...props.skill, 'achievedHours': valNum });
    }
    return (
        <div onClick={() => setSummaryOnly(!summaryOnly)}>
            { summaryOnly ?
                <Card key="1">
                    <H3>{name}</H3>
                    <H4>{achievedHours}/{targetHours} target hours</H4>
                    {startDate ? <H2>Started on  {moment(startDate).format('LL')} </H2> : ''}
                </Card>
            : 
                <Card key="2">
                    <H3>{name}</H3>
                    <FormGroup label="Achieved hours" labelFor="achievedHours">
                        <NumericInput
                            id="achievedHours"
                            data-testid="achievedHours"
                            value={achievedHours}
                            placeholder="Hours you target to achieve for this skill"
                            onValueChange={handleAchievedHrsChange}
                        />
                    </FormGroup>            
                    <H4>Target hours {targetHours}</H4>
                    <H5>{description}</H5>
                    {startDate ? <H2>Started on  {moment(startDate).format('LL')} </H2> : ''}            
                    <Button
                        type="submit"
                        data-testid="submit" 
                        text="Update" 
                        onClick={() => updateSkill(props.skillId, skill)}
                    />
                </Card>
            }
        </div>
    )
}