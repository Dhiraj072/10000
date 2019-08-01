import React from 'react';
import { render } from '@testing-library/react';
import { Dashboard } from './Dashboard';

it('renders without crashing', () => {
    const { getByText } = render(<Dashboard/>);
    expect(getByText('My skills')).toBeDefined();
});
