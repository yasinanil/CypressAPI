describe("Assertions", () => {

    it("Status code check", () => {

        //Explicit Assertion
        cy.request("https://jsonplaceholder.typicode.com/posts/1").then((response) => {

            expect(response.status).to.eq(200)

        })

        //Implicit Assertion
        cy.request("https://jsonplaceholder.typicode.com/posts/1").should("have.property", "status", 200)

    })


    it("Validate Response Body", () => {

        cy.request("https://jsonplaceholder.typicode.com/posts/1").then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.have.property("id", 1);
            expect(response.body.title).to.be.a("string");
        })

        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .its("body.id").should("equal", 1)

        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .its("body.title").should("be.a", "string")

        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .its("body.title").should("equal", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit")

    })

    it("Check Headers", () => {

        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers["content-type"]).to.include("application/json")
                expect(response.headers["server"]).to.include("cloudflare")
            })


        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .its("headers.content-type")
            .should("include", "application/json")
            .and("include", "charset=utf-8")

    })


    it("Check Body with JS Object", () => {


        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .its("body")
            .should("deep.equal", {
                userId: 1,
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            })


        cy.fixture("postBody").then((postBody) => {
            cy.request("https://jsonplaceholder.typicode.com/posts/1")
                .its("body")
                .should("deep.equal", postBody)
        })
    })


    it("Nested Property Assertions", () => {

        cy.request("https://jsonplaceholder.typicode.com/posts/1")
            .its("body")
            .should("include", { id: 1, userId: 1 })
            .and("have.property", "body")

        // Check the second element's rating count
        cy.request("https://fakestoreapi.com/products")
            .its("body[1].rating.count").should("eq", 259)
    })


    it.only("Chain Multiple Assertions", ()=>{

        cy.request("https://jsonplaceholder.typicode.com/posts/1").then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys("id", "userId", "title", "body")
            expect(response.duration).to.be.lessThan(1000)
        })
    })
})