/// <reference types="cypress" />

//Admin empty export to make this spec file a module
export { }

context('Given a user is in the homepage', () => {

  specify('The user can see the descriptive texts properly', () => {

    cy.visit('/')

    cy.log('**Verifying that the banner is present**')
    cy.findByRole('heading', { name: 'Sparkeats' }).should('be.visible')
    cy.findByRole('link', { name: 'Sparkeats logo' }).should('be.visible')

    cy.log('**Verifying the locaton picker region**')
    cy.findByRole('button', { name: 'All Places' }).should('be.visible')
  })

  specify('The user can view the location selector combobox', () => {
    cy.log('**Verifying the dropdown options**')
    cy.findByRole('button', { name: 'All Places' }).click()
    cy.findByRole('heading', { name: 'Pick a Location' }).parent().within(() => {
      cy.findAllByRole('listitem').should($options => {
        expect($options.length > 0).to.be.true
      })
    })
  })

  specify('The user should be able to view the list of restarurants in the section below the location selector', () => {
    cy.log('**Verifying that the restaurant cards are shown up correctly**')
    cy.findAllByRole('link', { name: /\d+ Review[\S]*/ }).should($options => {
      expect($options.length > 0).to.be.true
    })
  })

  specify('The user is able to view the footer region as well', () => {
    cy.log('**Verifying the footer region**')
    cy.findByRole('contentinfo').should($el => {

      const textInFooterWithoutSpaces = $el.text().trim().replaceAll('\n', '').replaceAll(' ', '')

      expect(textInFooterWithoutSpaces).to.include('Food is an important part of Sparkbox culture. When traveling, we often wonder where to eat and drink. Enter Sparkeats, our way to review and find the best restaraunts in town—wherever that might be'.replaceAll(' ', ''))

      expect(textInFooterWithoutSpaces).to.include('Copy about the apprenticeship program can go here. This content needs to be written. Copy about the apprenticeship program can go here. This content needs to be written'.replaceAll(' ', ''))

      expect(textInFooterWithoutSpaces).to.include('Sparkbox leads the way toward a better web as we craft responsive websites and web applications—and empower you to do the same'.replaceAll(' ', ''))
    })
  })
})

context('Given a user is in the homepage', () => {
  context('When the user selects a particular location from the combobox', () => {
    specify('The user should see a filtered list of restaurants based on the selected location', () => {

      let randomLocation = ''

      cy.visit('/')

      cy.log('**Select a location randomly from the list**')
      cy.findByRole('button', { name: 'All Places' }).click()

      cy.findByRole('heading', { name: 'Pick a Location' }).parent().within(() => {
        cy.findAllByRole('listitem').as('options').then($options => {
          let listOfLocations = $options.get().map(option => option.textContent!.trim())
          randomLocation = listOfLocations[Math.floor(Math.random() * listOfLocations.length)]

          cy.log(`The randomly chosen location is ${randomLocation}`)
          cy.get('@options').contains(randomLocation).click()
        })
      })

      cy.log('**Verify that the filtered list is correct**')
      cy.findAllByRole('list').within(() => {
        cy.findAllByText(randomLocation.toUpperCase(), { exact: false }).each(($cityTextInCard, index) => {
          debugger
          expect($cityTextInCard.text()).to.include(randomLocation)
        })
      })
    })

    specify('The user can navigate to the restaurant details page for the after the user clicks on one of the restaurant card options', () => {

      cy.log('**Randomly click one of the restaurants from the filtered list**')
      cy.findAllByRole('list').as('filteredList').then($restaurants => {
        let listOfRestaurants = $restaurants.get().map(option => option.textContent!.trim())
        let randomIndex = Math.floor(Math.random() * listOfRestaurants.length)

        cy.get('@filteredList').within(() => {
          cy.findAllByRole('heading', { level: 3 }).eq(randomIndex).click()
        })
      })
    })
  })
})

