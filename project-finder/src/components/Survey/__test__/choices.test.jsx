import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Choices from '../choices';


describe('Choices', () => {
  const choices = [1, 2, 3, 4];
  const mockOnChange = jest.fn();

  const setup = () => (
    render(<Choices choices={choices} onChange={mockOnChange} />)
  );

  beforeEach(() => {
    mockOnChange.mockReset();
  });

  it('Should display choices', () => {
    const { getByText, getAllByLabelText } = setup();

    expect(getAllByLabelText('not selected').length).toBe(choices.length);
    choices.forEach((element) => {
      expect(getByText(`${element}`)).not.toBeNull();
    });
  });

  it('Should select element on click', () => {
    const { getByText, getByLabelText } = setup();

    const button = getByText(`${choices[0]}`);

    fireEvent.click(button);

    expect(getByLabelText('selected')).not.toBeNull();
    expect(mockOnChange).toHaveBeenCalledWith(choices[0]);
  });
});
