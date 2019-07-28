import React from 'react';
import { ISkill } from "../../common/types";
import { Skill } from "./Skill";

interface SkillsListProps {
    skills: ISkill[]
}

export const SkillsList: React.FC<SkillsListProps> = (props) => (
        <div>
            {
                props.skills.map(({name, description, targetHours, achievedHours, startDate}) => (
                    <Skill
                        key={name}
                        name={name}
                        description={description}
                        targetHours={targetHours}
                        achievedHours={achievedHours}
                        startDate={startDate}
                    />
                ))
            }
        </div>
)