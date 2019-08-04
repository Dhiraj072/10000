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
    const { getByText } = render(
    <Skill
        skillId={skillProps.id}
        skill={skillProps.skill}
    />)
    expect(getByText("foo")).toBeDefined();
    expect(getByText("2", { exact: false })).toBeDefined();
    expect(getByText("1", { exact: false })).toBeDefined();
})

it('toggles skill details on click correctly', async () => {
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
    const { getByTestId, getByText } = render(
        <Skill
            skillId={skillProps.id}
            skill={skillProps.skill}
        />);
    const updateSkillMock = jest.spyOn(firebase, "updateSkill");
    await fireEvent.click(getByText(skillProps.skill.name));
    await fireEvent.change(getByTestId("achievedHours"), { target: { value: 2 } });
    await fireEvent.click(getByTestId("submit"));
    expect(updateSkillMock).toHaveBeenCalledWith(skillProps.id, {
        ...skillProps.skill,
        achievedHours: 2
    });
})