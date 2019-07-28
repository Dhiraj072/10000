import React from 'react';
import { render } from '@testing-library/react';
import { Skill } from './Skill';

it('renders a skill correctly', () => {
    const { getByText } = render(
    <Skill
        name="foo"
        targetHours={2}
        achievedHours={1}
    />)
    expect(getByText("foo")).toBeDefined();
    expect(getByText("2", { exact: false })).toBeDefined();
    expect(getByText("1", { exact: false })).toBeDefined();
})