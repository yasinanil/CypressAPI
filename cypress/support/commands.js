/// <reference types="cypress" />


Cypress.Commands.add("apiRequest", (method, parameters, body = null, overrides = {}) => {

    cy.request({
        method: "Post",
        url: "https://thinking-tester-contact-list.herokuapp.com/users/login",
        body: {
            "email": "john.talentifylab@gmail.com",
            "password": "John.123"
        }
    }).then((response) => {
        const token = response.body.token;

        const requestSpec = {
            method,
            url: "https://thinking-tester-contact-list.herokuapp.com/" + parameters,
            headers: {
                "Authorization": "Bearer " + token,
                "Contect-type": "application/json"
            },
            body,
            overrides
        }
        return cy.request(requestSpec)
    })
})