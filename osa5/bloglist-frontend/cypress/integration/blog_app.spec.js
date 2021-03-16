describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'antti',
      password: 'antti',
      name: 'antti'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('antti')
      cy.get('#password').type('antti')
      cy.get('#login-button').click()

      cy.contains('succesfully logged in as antti')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('antti')
      cy.get('#password').type('mutantti')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'wrong credentials')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'antti', password: 'antti' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypresshill.com')

      cy.get('#create').click()
      cy.get('#blogs')
        .should('contain', 'a blog created by cypress')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'another blog cypress', author: 'cypress author', url: 'www.cypresshill.com' })
      })

      it('a blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('#likeCount')
          .contains('1')
      })

      it('user who has added a blog can remove it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('#blogs')
          .should('not.contain', 'another blog created by cypress')
      })

      it('cannot remove other users blogs', function() {
        const user = { username: 'eriAntti', password: 'eriAntti', user: 'eriAntti' }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.contains('logout').click()
        cy.get('#username').type('eriAntti')
        cy.get('#password').type('eriAntti')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('remove')
          .should('have.css', 'display', 'none')
      })
    })

    it.only('blogs are ordered correctly via likes', function() {
      cy.createBlog({ title: 'first blog by cypress', author: 'cypress author', url: 'www.cypresshill.com', likes: 50 })
      cy.createBlog({ title: 'second blog by cypress', author: 'cypress author', url: 'www.cypresshill.com', likes: 1 })
      cy.createBlog({ title: 'third blog by cypress', author: 'cypress author', url: 'www.cypresshill.com', likes: 100 })

      cy.get('.blog')
        .eq(0)
        .should('contain.text', 'third')

      cy.get('.blog')
        .eq(1)
        .should('contain.text', 'first')

      cy.get('.blog')
        .eq(2)
        .should('contain.text', 'second')
    })
  })
})