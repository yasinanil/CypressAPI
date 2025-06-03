describe("JSON Response", () => {


    it("Basic Field Validation", () => {

        cy.request({

            method: "Get",
            url: "https://fakestoreapi.com/products",

        }).then((response) => {

            expect(response.status).to.equal(200)
            expect(response.body[0].price).to.equal(109.95)
            expect(response.body[0].description).to.be.a("string")
            expect(response.body[0].rating.count).to.equal(120)

            expect(response.body[19].price).to.equal(12.99)
            expect(response.body[19].rating.rate).to.be.a("number")
            expect(response.body[19].rating.count).to.equal(145)
        })
    })

    it("Working with Multiple Items", () => {

        let sum = 0;

        cy.request({

            method: "Get",
            url: "https://fakestoreapi.com/products",

        }).then((response) => {

            expect(response.status).to.equal(200)
            response.body.forEach(item => {
                sum += item.price;
            });

            cy.log("Sum: " + sum)
            expect(sum).to.equal(3240.9199999999987)

        })
    })
})