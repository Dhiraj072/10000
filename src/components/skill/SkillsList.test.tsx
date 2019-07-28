import React from 'react';
import { render } from '@testing-library/react';
import { SkillsList } from './SkillsList';
import moment, { Moment } from "moment";

const moment1: Moment = moment().startOf('day');

const skills = [
        {
            name: "skill1",
            targetHours: 4,
            achievedHours: 1,
            startDate: moment1
        },
        {
            name: "skill2",
            targetHours: 4,
            achievedHours: 2
        }
]

it('renders a skill correctly', () => {
    const { getAllByText } = render(<SkillsList
        skills={skills}
    />);
    const renderedSkills = getAllByText("skill", { exact: false });
    expect(renderedSkills.length).toEqual(2);
    expect(renderedSkills[0].textContent).toEqual("skill1");
    expect(renderedSkills[1].textContent).toEqual("skill2");
})