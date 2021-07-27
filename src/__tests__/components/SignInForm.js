import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignIn/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const component = render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(component.getAllByTestId("input")[0], 'kalle');
      fireEvent.changeText(component.getAllByTestId("input")[1], 'password');
      fireEvent.press(component.getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });

      component.debug();

    });
  });
});