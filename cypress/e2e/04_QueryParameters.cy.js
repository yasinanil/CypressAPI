describe("Query Paramaeters", () => {

    it("User Page 2", () => {

        cy.request({

            method: "Get",
            url: "https://reqres.in/api/users",
            qs: { page: 2 }

        }).then((response) => {
            //cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200)
            expect(response.body.data).has.length(6)
            expect(response.body.data[0].email).to.eq("michael.lawson@reqres.in")
        })

    })

})