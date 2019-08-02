import React, { useState } from 'react';
import { FormGroup, InputGroup, NumericInput, Button } from '@blueprintjs/core';
import { ISkill } from '../../common/types';
import moment from 'moment';

const initSkill: ISkill = {
    name: "",
    description: "",
    targetHours: 0,
    achievedHours: 0,
    startDate: moment().startOf('day').valueOf()
}

interface AddSkillFormProps {
    onSubmit(skill: ISkill): void;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = (props) => {
    const { onSubmit } = props;
    const [skill, setSkill] = useState<ISkill>(initSkill);
    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event) {
            event.preventDefault();
        }
        setSkill({ ...skill, [event.target.id] : event.target.value});
    }
    const handleTargetHrsChange = (valNum: number, valStr: string) => {
        setSkill({ ...skill, 'targetHours': valNum});
    }
    return (
        <div>
            <FormGroup label="Name" labelFor="name" labelInfo="(required)">
                <InputGroup
                    id="name"
                    data-testid="name"
                    placeholder="Short name for your skill"
                    value={skill.name}
                    onChange={handleTextInputChange}
                />
            </FormGroup>
            <FormGroup label="Description" labelFor="description" labelInfo="(optional)">
                <InputGroup
                    id="description"
                    data-testid="description"
                    value={skill.description}
                    placeholder="Description for your skill"
                    onChange={handleTextInputChange}
                />
            </FormGroup>
            <FormGroup label="Target hours" labelFor="targetHours" labelInfo="(required)">
                <NumericInput
                    id="targetHours"
                    data-testid="targetHours"
                    value={skill.targetHours}
                    placeholder="Hours you target to achieve for this skill"
                    onValueChange={handleTargetHrsChange}
                />
            </FormGroup>
            <Button type="submit" data-testid="submit" text="Add skill" onClick={() => onSubmit(skill)}/>
        </div>
    )
}