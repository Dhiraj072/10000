import React from 'react';
import { Skill } from '../skill/Skill';
import { AddSkillForm } from '../skill/AddSkillForm';
import { Tab, Tabs } from "@blueprintjs/core";

export const Dashboard: React.FC = () => {
    return (
        <Tabs id="dashboardTabs" defaultSelectedTabId="sl">
            <Tab id="as" title="Add new skill" panel={<AddSkillForm />} />
            <Tab id="sl" title="My skills" panel={<Skill
                name="test"
                targetHours={2}
                achievedHours={1}
            />}  />
        </Tabs>
    )
}