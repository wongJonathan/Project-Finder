import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SurveyTextField from '../surveyTextField';


describe('Survey Text Field', () => {
  const mockOnchange = jest.fn();

  beforeEach(() => {
    mockOnchange.mockReset();
  });


  it('Should display placeholder and get change of text', () => {
    const mockProps = {
      placeholder: 'test',
      'aria-label': 'textbox',
    };
    const {
      getByPlaceholderText,
      getByLabelText,
    } = render(<SurveyTextField props={mockProps} onChange={mockOnchange} />);

    expect(getByPlaceholderText(mockProps.placeholder)).not.toBeNull();

    const input = getByLabelText(mockProps['aria-label']);
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');
  });

  it('Should display numbers only for ios for type=number', () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: '', writable: true });
    navigator.userAgent = 'iPad';
    const mockProps = {
      'aria-label': 'textbox',
    };
    const {
      getByLabelText,
    } = render(<SurveyTextField props={mockProps} type="number" onChange={mockOnchange} />);

    expect(getByLabelText(mockProps['aria-label'])).toHaveAttribute('pattern', '\\d*');
  });
});
