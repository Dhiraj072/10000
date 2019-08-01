import React from 'react';
import { AddSkillForm } from '../skill/AddSkillForm';
import { Tab, Tabs } from "@blueprintjs/core";
import { SkillsList } from '../skill/SkillsList';
import { addSkillToFirebase } from '../../firebase/firebase';

export const Dashboard: React.FC = () => {
    return (
        <Tabs id="dashboardTabs" defaultSelectedTabId="sl">
            <Tab id="as" title="Add new skill" panel={<AddSkillForm onSubmit={addSkillToFirebase}/>} />
            <Tab id="sl" title="My skills" panel={<SkillsList skills={[]}/>}  />
        </Tabs>
    )
}