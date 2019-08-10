import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ISkill } from '../../common/types';
import { addSkill, getSkills } from '../../firebase/firebase';
import { AddSkillForm } from '../skill/AddSkillForm';
import { SkillsList } from '../skill/SkillsList';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box paddingTop={2}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const Dashboard: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [skills, setSkills] = useState<[string, ISkill][]>([]);
    useEffect(() => {
        getSkills().then((skills) => {
            setSkills(skills);
        });
    });

    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="My skills" {...a11yProps(0)} />
                    <Tab label="Add skill" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SkillsList skills={skills} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddSkillForm onSubmit={addSkill} />
            </TabPanel>
        </div>
    );
}
