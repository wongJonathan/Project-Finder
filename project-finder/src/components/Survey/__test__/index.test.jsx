import React from 'react';
import { render } from '@testing-library/react';

import SurveyPage from '../index';


describe('Survey Page', () => {
  it('Should render', () => {
    render(<SurveyPage />);
  });
});
