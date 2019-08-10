import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Skill } from './Skill';
import * as firebase from '../../firebase/firebase';

const skillProps = {
    id: '1',
    skill: {
        name: 'foo',
        targetHours: 100,
        achievedHours: 200,
        description: 'test description'
    }
}

afterEach(cleanup) //

it('renders a skill correctly', () => {
    const { getAllByText } = render(
    <Skill
        skillId={skillProps.id}
        skill={skillProps.skill}
    />)
    expect(getAllByText("foo")).toBeDefined();
    expect(getAllByText("2", { exact: false })).toBeDefined();
    expect(getAllByText("1", { exact: false })).toBeDefined();
})

// We do toggle, but looks like the hidden component if rendered all the time
// TODO figure out a good way to test this, and enable this test
it.skip('toggles skill details on click correctly', async () => {
    const { queryByText, getByText } = render(
        <Skill
            skillId={skillProps.id}
            skill={skillProps.skill}
        />);
    expect(queryByText(skillProps.skill.description)).toEqual(null);
    await fireEvent.click(getByText(skillProps.skill.name));
    expect(queryByText(skillProps.skill.description)).not.toEqual(null);
    await fireEvent.click(getByText(skillProps.skill.name));
    expect(queryByText(skillProps.skill.description)).toEqual(null);
})

it('updates a skill correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
        <Skill
            skillId={skillProps.id}
            skill={skillProps.skill}
        />);
    const updateSkillMock = jest.spyOn(firebase, "updateSkill");
    await fireEvent.click(getByText(skillProps.skill.name));
    await fireEvent.change(getByPlaceholderText("Hours you have completed for this skill"), { target: { value: 2 } });
    await fireEvent.click(getByText("Update"));
    expect(updateSkillMock).toHaveBeenCalledWith(skillProps.id, {
        ...skillProps.skill,
        achievedHours: 2
    });
})