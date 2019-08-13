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

interface ValidationData {
    name: {
        error: boolean,
        errorMsg: string
    },
    targetHours: {
        error: boolean,
        errorMsg: string
    }
}

const initValidationData: ValidationData = {
    name: {
        error: true,
        errorMsg: "Name should be greater than 5 chars"
    },
    targetHours: {
        error: true,
        errorMsg: "Target hours must be greater than 0"
    }
}

interface AddSkillFormProps {
    onSubmit(skill: ISkill): void;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = (props) => {
    const { onSubmit } = props;
    const [skill, setSkill] = useState<ISkill>(initSkill);
    const [validationData, setValidationData]= useState<ValidationData>(initValidationData);
    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === "name" && event.target.value.length > 5) {
            setValidationData({ ...validationData, name: { error: false, errorMsg: "" } })
            setSkill({ ...skill, [event.target.id]: event.target.value });
        } else if (event.target.id === "targetHours" && +event.target.value > 0) {
            setValidationData({ ...validationData, targetHours: { error: false, errorMsg: "" } })
            setSkill({ ...skill, [event.target.id]: +event.target.value }); // convert value to number and set
        } else {
            setSkill({ ...skill, [event.target.id]: event.target.value }); // convert value to number and set
        }
    }
    const handleClickSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onSubmit(skill);
        setSkill(initSkill);
    }
    return (
        <Box width="50%">
            <form noValidate autoComplete="off">
                <TextField
                    required
                    fullWidth
                    margin="normal"
                    id="name"
                    label="Name"
                    error={validationData.name.error}
                    helperText={validationData.name.errorMsg}
                    placeholder="Short name for your skill"
                    value={skill.name}
                    onChange={handleTextInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="description"
                    label="Description"
                    value={skill.description}
                    placeholder="Description for your skill"
                    onChange={handleTextInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="targetHours"
                    label="Target hours"
                    error={validationData.targetHours.error}
                    helperText={validationData.targetHours.errorMsg}
                    value={skill.targetHours}
                    type="number"
                    placeholder="Hours you target to achieve for this skill"
                    onChange={handleTextInputChange}
                />
                <Button 
                    variant="contained"
                    color="primary"
                    data-testid="add-skill"
                    disabled={validationData.name.error && validationData.targetHours.error}
                    type="submit"
                    onClick={handleClickSubmit}
                >
                    Add Skill
                </Button>            
            </form>
        </Box>
    )
}