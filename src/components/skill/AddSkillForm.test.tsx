import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AddSkillForm } from './AddSkillForm';

const mockOnsubmit = jest.fn();

it('adds a new skill correctly', async () => {
    const { getByTestId, getByPlaceholderText } = render(<AddSkillForm
        onSubmit={mockOnsubmit}
    />)
    
    // Get form inputs
    const nameInput = getByPlaceholderText('Short name for your skill') as HTMLInputElement;
    const descriptionInput = getByPlaceholderText('Description for your skill') as HTMLInputElement;
    const targetHoursInput = getByPlaceholderText('Hours you target to achieve for this skill') as HTMLInputElement;
    
    // Verify initial values are displayed correctly
    expect(nameInput.value).toEqual('');
    expect(descriptionInput.value).toEqual('');
    expect(targetHoursInput.value).toEqual('0');
    
    // Update values
    await fireEvent.change(nameInput, { target: { value: 'test' }});
    await fireEvent.change(descriptionInput, { target: { value: 'test description' } });
    await fireEvent.change(targetHoursInput, { target: { value: 100 } });
    
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