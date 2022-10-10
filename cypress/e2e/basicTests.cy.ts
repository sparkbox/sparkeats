/// <reference types="cypress" />

//Admin empty export to make this spec file a module
export { }

const restaurantPlacardSelector = 'li.place-card__list-item'
const dropdownSelector = '.location-dropdown__button-text'
const dropdownOptionsSelector = 'li button.location-dropdown__list-button'
const footerSelector = '.footer'
const placeCardCitySelector = '.place-card__city'
const linkOfRestaurantSelector = '.place-card__name-link'

describe('some basic sanity tests', () => {

  context('a few smoke tests', () => {

    it('should display the description texts properly', () => {

      cy.visit('/')

      cy.log('**Verifying that the banner is present**')
      cy.get('.sparkeats-header').should('be.visible')
      cy.get('.sparkeats-header__logo').should('be.visible')
        .and('have.attr', 'href', '/refresh')

      cy.log('**Verifying the locaton picker region**')
      cy.get('.sparkeats-subtitle').should('be.visible')
        .and($el => {

          expect($el.text().trim().replaceAll('  ', ' ')).to.equal('sparkboxers review food and drink places so you can eat right')
        }
        )
    })

    it('should show the location options properly', () => {
      cy.log('**Verifying the dropdown options**')
      cy.get(dropdownSelector).should('have.text', 'All Places')
      cy.get('.location-dropdown__button').click()
      cy.get(dropdownOptionsSelector).should($options => {
        expect($options.length > 0).to.be.true
      })
    })

    it('should show the restaurant cards properly', () => {
      cy.log('**Verifying that the restaurant cards are shown up correctly**')
      cy.get(restaurantPlacardSelector).should($options => {
        expect($options.length > 0).to.be.true
      })
    })

    it('should have the footer displayed properly', () => {
      cy.log('**Verifying the footer region**')
      cy.get(footerSelector).should($el => {

        const textInFooterWithoutSpaces = $el.text().trim().replaceAll('\n', '').replaceAll(' ', '')

        expect(textInFooterWithoutSpaces).to.include('Food is an important part of Sparkbox culture. When traveling, we often wonder where to eat and drink. Enter Sparkeats, our way to review and find the best restaraunts in town—wherever that might be'.replaceAll(' ', ''))

        expect(textInFooterWithoutSpaces).to.include('Copy about the apprenticeship program can go here. This content needs to be written. Copy about the apprenticeship program can go here. This content needs to be written'.replaceAll(' ', ''))

        expect(textInFooterWithoutSpaces).to.include('Sparkbox leads the way toward a better web as we craft responsive websites and web applications—and empower you to do the same'.replaceAll(' ', ''))
      })
    })
  })

  context('tests to verify the filter functionality', () => {
    it('should filter the results based on the selected location', () => {

      let randomLocation = ''

      cy.visit('/')

      cy.log('**Select a location randomly from the list**')
      cy.get(dropdownSelector).click()
      cy.get(dropdownOptionsSelector).then($options => {
        let listOfLocations = $options.get().map(option => option.textContent!.trim())
        randomLocation = listOfLocations[Math.floor(Math.random() * listOfLocations.length)]

        cy.log(`The randomly chosen location is ${randomLocation}`)
        cy.get(dropdownOptionsSelector).contains(randomLocation).click()
      })

      cy.log('**Verify that the filtered list is correct**')
      cy.get(restaurantPlacardSelector).not('.hidden').within(() => {
        cy.get(placeCardCitySelector).each(($cityTextInCard, index) => {
          expect($cityTextInCard.text()).to.include(randomLocation)
        })
      })
    })

    it('should open the details page for a selected restaurant', () => {

      cy.log('**Randomly click one of the restaurants from the filtered list**')
      cy.get(restaurantPlacardSelector).not('.hidden').as('filteredList').then($restaurants => {
        let listOfRestaurants = $restaurants.get().map(option => option.textContent!.trim())
        let randomIndex = Math.floor(Math.random() * listOfRestaurants.length)

        cy.get(restaurantPlacardSelector).not('.hidden').then($options => {
          cy.get('@filteredList').within(() => {
            cy.get(linkOfRestaurantSelector).eq(randomIndex).click()
          })
        })
      })
    })
  })
})
