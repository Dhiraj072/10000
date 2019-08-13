import React, { useState } from 'react';
import { ISkill } from '../../common/types';
import moment from 'moment';
import { Box, Button, TextField } from '@material-ui/core';
import { SkillProps } from './Skill';
import { updateSkill } from '../../firebase/firebase';

interface KeyValue {
    title: string,
    value: string | undefined
}

export const KeyValueDisplay: React.FC<KeyValue> = (props) => (
    props.value ? 
        <Box width="100%">
            <Box width="30%" display="inline-block" padding={1} fontWeight="fontWeightMedium">{props.title}</Box>
            <Box width="70%" display="inline-block" padding={1}>{props.value}</Box>
        </Box>
     :
        <Box/>
);

const withFirstLetterCaps = (str: string | undefined): string => (
    str && str[0] ? str[0].toUpperCase().concat(str.substring(1)) : ""
);

export const UpdateSkillForm: React.FC<SkillProps> = (props) => {
    const [skill, setSkill] = useState<ISkill>(props.skill);
    const { name, description, targetHours, achievedHours, startDate } = skill;
    const handleAchievedHrsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSkill({ ...props.skill, 'achievedHours': +event.target.value });
    }
    const handleClickUpdate = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        updateSkill(props.skillId, skill);
    }
    return (
        <Box width="100%">
            <KeyValueDisplay title="Name" value={withFirstLetterCaps(name)} />
            <KeyValueDisplay title="Description" value={withFirstLetterCaps(description)} />
            <KeyValueDisplay title="Target hours" value={targetHours.toString()}/>
            <KeyValueDisplay title="Achieved hours" value={achievedHours.toString()} />
            <KeyValueDisplay title="Started on" value={moment(startDate).format('LL')} />
            <Box width="30%">
                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        id="achievedHours"
                        data-testid="achievedHours"
                        label="Updated achieved hours"
                        value={achievedHours}
                        type="number"
                        placeholder="Hours you have completed for this skill"
                        onChange={handleAchievedHrsChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="update-skill"
                        type="submit"
                        onClick={handleClickUpdate}
                    >
                    Update
                    </Button>    
                </form>
            </Box>        
        </Box>
    )
}