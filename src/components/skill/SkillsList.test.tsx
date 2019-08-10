import React from 'react';
import { render } from '@testing-library/react';
import { SkillsList } from './SkillsList';
import moment, { Moment } from "moment";
import { ISkill } from '../../common/types';

const moment1: Moment = moment().startOf('day');

const skills: [string, ISkill][] = [
        [ 'skill1_uid', {
            name: "skill1",
            targetHours: 4,
            achievedHours: 1,
            startDate: moment1.valueOf()
        }],
        [ 'skill2_uid', {
            name: "skill2",
            targetHours: 4,
            achievedHours: 2
        }]
]

it('renders skills list correctly', () => {
    const { getAllByText } = render(<SkillsList
        skills={skills}
    />);
    const renderedSkills = getAllByText("skill", { exact: false });
    expect(renderedSkills.length).toEqual(4);
    expect(renderedSkills[0].textContent).toEqual("Skill1");
    expect(renderedSkills[2].textContent).toEqual("Skill2");
})