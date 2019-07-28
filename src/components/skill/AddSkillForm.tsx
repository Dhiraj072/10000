import React, { useState } from 'react';
import { FormGroup, InputGroup, ControlGroup, NumericInput, Button } from '@blueprintjs/core';
import { ISkill } from '../../common/types';

const initSkill: ISkill = {
    name: "",
    targetHours: 0,
    achievedHours: 0,
}

export const AddSkillForm: React.FC = () => {
    const [skill, setSkill] = useState<ISkill>(initSkill);
    return (
        <div>
            <FormGroup label="Name" labelFor="name" labelInfo="(required)">
                <InputGroup id="name" placeholder="Short name for your skill"/>
            </FormGroup>
            <FormGroup label="Description" labelFor="name" labelInfo="(optional)">
                <InputGroup id="description" placeholder="Description for your skill" />
            </FormGroup>
            <FormGroup label="Target hours" labelFor="name" labelInfo="(optional)">
                <NumericInput id="targetHours" placeholder="Hours you target to achieve for this skill" />
            </FormGroup>
            <Button type="submit" text="Add skill"/>
        </div>
    )
}