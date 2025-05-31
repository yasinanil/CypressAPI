import { faker } from "@faker-js/faker"

describe("Request Spec", () => {

    it("Get Contact List", () => {

        cy.apiRequest("Get", "contacts").then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
        })

    })

    it("Create Contact", () => {

        const contactBody = {
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

        cy.apiRequest("Post", "contacts", contactBody).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(201)
        })

    })




})