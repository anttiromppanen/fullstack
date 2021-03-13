import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogView from './NewBlogView'

test('new blog is created with valid information', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogView createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(author, {
    target: { value: 'test author' }
  })
  fireEvent.change(url, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})