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
                        skillId={skill[0]}
                        skill={skill[1]}
                    />
                ))
            }
        </div>
)