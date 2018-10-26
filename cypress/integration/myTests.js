describe('My First Test', function() {
  it("first test", function() {
    //Arrange - setup initial app state
    //visit a web page
    // query for an element
    // Act - take an action 
    //interct with the element
    //assert make an assertion about changes

    cy.visit('http://localhost:3000')
    cy.contains('Image Gallery')
    cy.get('.grid-container').children().should('have.length', 10)
    
    cy.get('img').then(($images) => {
      $images.first().click()
      cy.get('.grid-container__small').then(($largeImg) => {
        
        expect($largeImg.first()).to.have.css('width', '590px')
        
      })
      cy.get('.close').click()
    
    })
    
    cy.get('input')
      .type('dogs')
      .should('have.value', 'dogs').then(() => {
        cy.get('button').click().then(() => {
          cy.get('.grid-container').children().should('have.length', 10)  
          .then(($gridcont) => {
            cy.get('.pagination-container__button').last().click()
            .then(() => {
              cy.get('.thumbnail-container').then(($container) => {
                expect($container.children().first()).to.have.attr('alt', 'fawn pug lying on floor')
              })
            })
          })
        })
      }) 

      
    
    cy.get('.grid-container__thumbnails').last()
  })
})

//"fawn pug lying on floor"


