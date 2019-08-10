import React, { useState } from 'react';
import { ISkill } from '../../common/types';
import moment from 'moment';
import { Box, Button, TextField } from '@material-ui/core';

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
        if (event.target.id === "targetHours")
            setSkill({ ...skill, [event.target.id]: +event.target.value }); // convert value to number and set
        else
            setSkill({ ...skill, [event.target.id] : event.target.value});
    }
    const handleTargetHrsChange = (valNum: number, valStr: string) => {
        setSkill({ ...skill, 'targetHours': valNum});
    }
    return (
        <Box width="50%">
            <form noValidate autoComplete="off">
                <TextField
                    required
                    fullWidth
                    margin="normal"
                    id="name"
                    data-testid="name"
                    label="Name"
                    placeholder="Short name for your skill"
                    value={skill.name}
                    onChange={handleTextInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="description"
                    data-testid="description"
                    label="Description"
                    value={skill.description}
                    placeholder="Description for your skill"
                    onChange={handleTextInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="targetHours"
                    data-testid="targetHours"
                    label="Target hours"
                    value={skill.targetHours}
                    type="number"
                    placeholder="Hours you target to achieve for this skill"
                    onChange={handleTextInputChange}
                />
                <Button 
                    variant="contained"
                    color="primary"
                    data-testid="submit"
                    type="submit"
                    onClick={() => onSubmit(skill)}
                >
                    Add Skill
                </Button>            
            </form>
        </Box>
    )
}