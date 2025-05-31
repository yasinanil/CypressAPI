import { fa, faker } from '@faker-js/faker';

describe("Add Header", () => {


    let token = null;

    before(() => {

        cy.request({
            method: "Post",
            url: "https://thinking-tester-contact-list.herokuapp.com/users/login",
            body: {
                "email": "john.talentifylab@gmail.com",
                "password": "John.123"
            }
        }).then((response) => {
            token = response.body.token;
            cy.log(token)
        })
    })


    it("Add Contact", () => {

        cy.request({
            method: "Post",
            url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: {
                "firstName": faker.person.firstName(),
                "lastName": faker.person.lastName(),
                "birthdate": "1970-01-01",
                "email": faker.internet.email(),
                "phone": "8005555555",
                "street1": "1 Main St.",
                "street2": "Apartment A",
                "city": "Anytown",
                "stateProvince": "KS",
                "postalCode": "12345",
                "country": "USA"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })


    it("Get Contact List", () => {

        cy.request({
            method: "Get",
            url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
        })
    })
})