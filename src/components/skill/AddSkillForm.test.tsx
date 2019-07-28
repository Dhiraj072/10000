import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Skill } from './Skill';
import { AddSkillForm } from './AddSkillForm';
import { any, number } from 'prop-types';

const mockOnsubmit = jest.fn();

it('renders a skill correctly', async () => {
    const { getByTestId } = render(<AddSkillForm
        onSubmit={mockOnsubmit}
    />)
    
    // Get form inputs
    const nameInput = getByTestId('name') as HTMLInputElement;
    const descriptionInput = getByTestId('description') as HTMLInputElement;
    const targetHoursInput = getByTestId('targetHours') as HTMLInputElement;
    
    // Verify initial values are displayed correctly
    expect(nameInput.value).toEqual('');
    expect(descriptionInput.value).toEqual('');
    expect(targetHoursInput.value).toEqual('0');
    
    // Update values
    await fireEvent.change(nameInput, { target: { value: 'test' }});
    await fireEvent.change(descriptionInput, { target: { value: 'test description' } });
    await fireEvent.change(getByTestId('targetHours'), { target: { value: 100 } });
    
    // Verify updated values are displayed correctly
    expect(nameInput.value).toEqual('test');
    expect(descriptionInput.value).toEqual('test description');
    expect(targetHoursInput.value).toEqual('100');

    // Verify onSubmit callback called with correct params
    fireEvent.click(getByTestId('submit'));
    expect(mockOnsubmit).toHaveBeenCalledWith({
        name: 'test',
        description: 'test description',
        targetHours: 100,
        achievedHours: 0,
        startDate: expect.any(Number)
    });
})