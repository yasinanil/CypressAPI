/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe("Payload", () => {


    it("Hardcoded Payload", () => {

        const payload = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe.965john@fake.com",
            "password": "myPassword"
        }

        cy.request({
            method: "Post",
            url: "https://thinking-tester-contact-list.herokuapp.com/users",
            body: payload
        }).should("have.a.property", "status", 201)


    })

    it("Dynamic Data", () => {

        const payload = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": faker.internet.password()
        }

        cy.log(JSON.stringify(payload))

        cy.request({
            method: "Post",
            url: "https://thinking-tester-contact-list.herokuapp.com/users",
            body: payload
        }).should("have.a.property", "status", 201)

    })


    it("Fixture", () => {

        cy.fixture("newUserBody").then((payload) => {

            payload.email = faker.internet.email();

            cy.log(JSON.stringify(payload))

            cy.request({
                method: "Post",
                url: "https://thinking-tester-contact-list.herokuapp.com/users",
                body: payload
            }).should("have.a.property", "status", 201)
        })
    })
})