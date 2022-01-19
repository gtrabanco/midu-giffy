import React from 'react';
import { render, waitFor, waitForElement } from '@testing-library/react';
import App from 'App';

test('check gif links', async () => {
  const {container} = render(<App />);
  //const gifLink = await waitFor(() => container.querySelector('.Gif-link'), { interval: 200})
  const gifLink = await waitForElement( () => container.querySelector('.Gif-link'));
  expect(gifLink).toBeVisible()
})
