import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component = null
let user = null
let blog = null
let mockHandler = null

beforeEach(() => {
  mockHandler = jest.fn()

  user = {
    id: 'abc123',
    username: 'username',
    name: 'user name'
  }

  blog = {
    title: 'first blog post',
    author: 'Matti Vanhanen',
    url: 'www.matti.com',
    likes: 0,
    user: user
  }

  component = render(
    <Blog blog={blog} user={user} addVote={mockHandler} />
  )
})

test('only title and author are rendered by default', async () => {
  const div = component.container.querySelector('.togglableContent')

  expect(component.container).toHaveTextContent('Matti Vanhanen')
  expect(component.container).toHaveTextContent('first blog post')
  expect(div).toHaveStyle('display: none')
})

test('url and likes are rendered after button click', async () => {
  const div = component.container.querySelector('.togglableContent')
  const button = component.container.querySelector('.toggleInformation')
  fireEvent.click(button)

  expect(div).toHaveStyle('display: block')
})

test('two like button presses fire two function calls in total', async () => {
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})