import React from 'react';
import { render } from '@testing-library/react';

import SurveyButton from '../surveyButton';


describe('Survey Button', () => {
  it('Should display content', () => {
    const mockContent = 'test';
    const { getByText, getByLabelText } = render(<SurveyButton content={mockContent} />);

    expect(getByText(mockContent)).not.toBeNull();
    expect(getByLabelText('not selected')).not.toBeNull();
  });

  it('Should display selected', () => {
    const { getByLabelText } = render(<SurveyButton content="test" selected />);

    expect(getByLabelText('selected')).not.toBeNull();
  });
});
