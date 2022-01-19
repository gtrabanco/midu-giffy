import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from 'App';

// When Home is Sync
// test('renders without crashing', () => {
//   const { getByText } = render(<App />);
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();

//   const title = getByText(/.{1}ltima b.{1}squeda/i);
//   expect(title).toBeInTheDocument();
// });

//When home is async
test('home work as expected', async () => {
  //Async component load search of element
  const { findByText } = render(<App />);
  const title = await findByText(/.{1}ltima b.{1}squeda/i);
  expect(title).toBeInTheDocument();
})

test('search from could be used', async () => {
  const search = 'Matrix';
  render(<App />)

  const textbox = await screen.findByRole('textbox');
  const button = await screen.findByRole('button');

  fireEvent.change(textbox, {target: { value: search}});
  fireEvent.click(button);

  const title = await screen.findByText(search);
  expect(title).toBeVisible();
})
