import React, { useState, useEffect } from 'react';
import { AddSkillForm } from '../skill/AddSkillForm';
import { Tab, Tabs } from "@blueprintjs/core";
import { SkillsList } from '../skill/SkillsList';
import { addSkill, getSkills } from '../../firebase/firebase';
import { ISkill } from '../../common/types';

export const Dashboard: React.FC = () => {
    const [skills, setSkills] = useState<[string, ISkill][]>([]);
    useEffect(() => {
        getSkills().then((skills) => {
            setSkills(skills);
        });
    });
    return (
        <Tabs id="dashboardTabs" defaultSelectedTabId="sl">
            <Tab id="as" title="Add new skill" panel={<AddSkillForm onSubmit={addSkill}/>} />
            <Tab id="sl" title="My skills" panel={<SkillsList skills={skills}/>}  />
        </Tabs>
    )
}