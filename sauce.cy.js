
beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  
    const userName = 'standard_user'
    const userPass = 'secret_sauce'
  
    cy.get('[data-test=username]').type(`${userName}{enter}`)
    cy.get('[data-test=password]').type(`${userPass}{enter}`)
  
    cy.get('[data-test=login-button]').click()
  });
  
  it('добавление товара в корзину через вкладку товара', () => {
    
   cy.get('.inventory_list .inventory_item')
   .eq(3)
   .find('.inventory_item_name')
   .click()
  
   cy.get('.inventory_details .inventory_details_desc_container')
   .find('.btn_primary')
   .click()
  });

  it('возвращение из корзины на вкладку товаров', () => {
  cy.get('.inventory_list .inventory_item')
    .eq(0)
    .find('.btn_primary')
    .click()

  cy.get('.shopping_cart_link').click()

  cy.get('.cart_list .cart_item').should('have.length', 1)
  cy.get('[data-test=continue-shopping]').click()
  });
  
  it('фильтрация по цене max', ()=>{
    cy.get('[data-test=product_sort_container]').select('hilo')
  
    let expectedTextForFirstItem = 'Sauce Labs Fleece Jacket'
  
    cy.get('.inventory_list .inventory_item')
    .eq(0)
    .find('.inventory_item_name')
    .should('have.text', expectedTextForFirstItem)
  });
  
  it('Выход', () => {
    cy.get('#react-burger-menu-btn').click()
  
    cy.get('#logout_sidebar_link').click()
  
  
    cy.get('[data-test=login-button]').contains('Login')
  
  });

  it('удаление товара из корзины', () => {

    cy.get('.inventory_list .inventory_item')
    .eq(0)
    .find('.btn_primary')
    .click()

    cy.get('.shopping_cart_link').click()
    cy.get('.cart_list .cart_item')
    .eq(0)
    .find('.btn_secondary')
    .click()

  });

  it('Покупка 2 товаров', () => {


    let FirstName = 'Natali'
    let LastPass = 'Masaleva'
    let PostalCode = '123456'
    let Product_1 = 'Sauce Labs Backpack'
    let Product_2 = 'Sauce Labs Bike Light'
    let Order = 'Thank you for your order!'
    
    cy.get('.inventory_list .inventory_item')
    .eq(0)
    .find('.btn_primary')
    .click()
    cy.get('.inventory_list .inventory_item')
    .eq(1)
    .find('.btn_primary')
    .click()
    
    cy.get('.shopping_cart_link').click()
    
    cy.get('[data-test=checkout]').click() 
      
    cy.get('[data-test=firstName]').type(`${FirstName}`)
     
    cy.get('[data-test=lastName]').type(`${LastPass}`)
     
    cy.get('[data-test=postalCode]').type(`${PostalCode}`)
     
      
    cy.get('[data-test=continue]').click()
    
    cy.get('.cart_item #item_4_title_link')
    .should('have.text', Product_1)
    cy.get('.cart_item #item_0_title_link')
    .should('have.text', Product_2)
    
    
    cy.get('[data-test=finish]').click()
    
    cy.get('.checkout_complete_container .complete-header')
    .should('have.text', Order)
    
    cy.get('[data-test=back-to-products]').click()
    
    
    });
  