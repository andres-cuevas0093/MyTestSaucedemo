describe('Compra con user 1', () => {


  beforeEach('visitar pagina', () => {
      cy.visit('https://www.saucedemo.com/')
  })

  it('Ingreso con usuario y contraseña validos', () => {
      cy.log('Login exitoso')
      cy.Login('standard_user', 'secret_sauce')
      cy.get('#login-button').click()
  })

  it('login con usuario y contraseña ivalida', () => {
      cy.log('Login fail')
      cy.Login('Salsa', 'Mitseriosa')
      cy.get('#login-button').click()
      cy.get('[class="error-message-container error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')

  })

  it('Compra exitosa con valores correctos', () => {
      cy.log('Compra exitosa')
      cy.Login('standard_user', 'secret_sauce')
      cy.get('#login-button').click()
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('#shopping_cart_container').then(checkout => {
          cy.log('Checkout')
          cy.wrap(checkout).click()
          cy.contains('Checkout').click()
          cy.Checkout('Andres', 'Cuevas', '5000')
          cy.contains('Continue').click()
      })
      cy.contains('Finish').click()
      cy.get('#checkout_complete_container').then(completeCheckout => {
          cy.wrap(completeCheckout).get('[class="complete-header"]').should('contain', 'Thank you for your order!')
      }
      )
      cy.contains('Back Home').click()
      cy.get('#react-burger-menu-btn').then(logout => {
          cy.wrap(logout).click()
          cy.get('#logout_sidebar_link').click()
      })
  })

  it('Compra con datos de usuario incorrectos', () => {
      cy.log('Compra fallida')
      cy.Login('standard_user', 'secret_sauce')
      cy.get('#login-button').click()
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('#shopping_cart_container').then(checkout => {
          cy.log('Checkout')
          cy.wrap(checkout).click()
          cy.contains('Checkout').click()
          cy.Checkout('123', '456', 'Salsa')
          cy.contains('Continue').click()
      })
      cy.contains('Finish').click()
      cy.get('#checkout_complete_container').then(completeCheckout => {
          cy.wrap(completeCheckout).get('[class="complete-header"]').should('contain', 'Thank you for your order!')
      }
      )
      cy.contains('Back Home').click()
      cy.get('#react-burger-menu-btn').then(logout => {
          cy.wrap(logout).click()
          cy.get('#logout_sidebar_link').click()
      })

  })

})

describe('Compra con user 2', () => {
  beforeEach('visitar la url', () => {
      cy.visit('https://www.saucedemo.com/')
  })

  it('Ingreso con usuario y contraseña validos', () => {
      cy.log('Login exitoso')
      cy.Login('problem_user', 'secret_sauce')
      cy.get('#login-button').click()
  })

  it.only('Compra exitosa con valores correctos', () => {
      cy.log('Compra exitosa')
      cy.Login('problem_user', 'secret_sauce')
      cy.get('#login-button').click()
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('#shopping_cart_container').then(checkout => {
          cy.log('Checkout')
          cy.wrap(checkout).click()
          cy.contains('Checkout').click()
          cy.Checkout('Andres', 'Cuevas', '5000')
          cy.contains('Continue').click()
          cy.contains('Cancel').click()
      })
      cy.contains('Remove').click()
      cy.get('#continue-shopping').click()
      cy.get('#react-burger-menu-btn').then(logout => {
          cy.wrap(logout).click()
          cy.get('#logout_sidebar_link').click()
      })
  })
      

})