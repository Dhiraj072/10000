import React from 'react';
import { Skill } from '../skill/Skill';
import { AddSkillForm } from '../skill/AddSkillForm';
import { Tab, Tabs } from "@blueprintjs/core";
import * as firebase from 'firebase';
import { SkillsList } from '../skill/SkillsList';
import { ISkill } from '../../common/types';

const addSkillToFirebase = (skill: ISkill): void => {
    const user = firebase.auth().currentUser ;
    if (user !== null) {
        console.log('Adding skill ', skill)
        firebase.database().ref(`users/${user.uid}/skills`).push(skill);
    } else {
        throw new Error("Not logged in");
    }
}

export const Dashboard: React.FC = () => {
    return (
        <Tabs id="dashboardTabs" defaultSelectedTabId="sl">
            <Tab id="as" title="Add new skill" panel={<AddSkillForm onSubmit={addSkillToFirebase}/>} />
            <Tab id="sl" title="My skills" panel={<SkillsList skills={[]}/>}  />
        </Tabs>
    )
}