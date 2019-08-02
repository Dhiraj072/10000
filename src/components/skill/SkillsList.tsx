import React from 'react';
import { ISkill } from "../../common/types";
import { Skill } from "./Skill";

interface SkillsListProps {
    skills: [string, ISkill][]
}

export const SkillsList: React.FC<SkillsListProps> = (props) => (
        <div>
            {
                props.skills.map((skill) => (
                    <Skill
                        key={skill[0]}
                        name={skill[1].name}
                        description={skill[1].description}
                        targetHours={skill[1].targetHours}
                        achievedHours={skill[1].achievedHours}
                        startDate={skill[1].startDate}
                    />
                ))
            }
        </div>
)