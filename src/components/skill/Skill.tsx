import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { ISkill } from '../../common/types';
import { UpdateSkillForm } from './UpdateSkillForm';
import { SkillSummary } from './SkillSummary';

export interface SkillProps {
    skillId: string,
    skill: ISkill
}

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

export const Skill: React.FC<SkillProps> = (props) =>  {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [skill] = useState<ISkill>(props.skill);
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div>
            <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <SkillSummary skillId={props.skillId} skill={skill}/>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <UpdateSkillForm skillId={props.skillId} skill={skill} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
