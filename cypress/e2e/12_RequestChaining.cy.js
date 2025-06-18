describe("Approach 1", () => {

    it("Placeholder API", () => {

        cy.request({
            method: "Get",
            url: "https://jsonplaceholder.typicode.com/posts"
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(99)
            return response.body[1].id;

        }).then((id) => {
            cy.request({
                method: "Get",
                url: "https://jsonplaceholder.typicode.com/posts/" + id
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.title).to.equal("qui est esse")
            })
        })
    })
})

const token = "c07b29c061f743657418b8fa2e3ee6254d6132e4202354d96a8bcbfa396f369e";
describe("Approach 2", () => {

    it("GoRest API CRUD", () => {

        cy.request({
            method: "Post",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                name: "John Doe",
                gender: "Male",
                email: Math.random().toString(5).substring(2) + "@gmail.com",
                status: "active"
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            let userId = response.body.id
            cy.request({
                method: "Get",
                url: "https://gorest.co.in/public/v2/users/" + userId,
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.equal("John Doe")

                cy.request({
                    method: "Put",
                    url: "https://gorest.co.in/public/v2/users/" + userId,
                    body: {
                        name: "Mary Star",
                        gender: "female"
                    },
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    expect(response.body.name).to.equal("Mary Star")
                    expect(response.body.gender).to.equal("female")

                    cy.request({
                        method: "Delete",
                        url: "https://gorest.co.in/public/v2/users/" + userId,
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(204)
                        expect(response.body).to.be.empty
                    })
                })
            })
        })
    })
})