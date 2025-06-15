describe("Authentication", () => {


    it("Basic Authentication", () => {

        cy.request({
            method: "Get",
            url: "https://postman-echo.com/basic-auth",
            auth: {
                user: "postman",
                pass: "password"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    it("Digest Authentication", () => {

        cy.request({
            method: "Get",
            url: "https://postman-echo.com/basic-auth",
            auth: {
                user: "postman",
                pass: "password",
                method: "digest"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjlhNmY3MTk5NjRmMDAwMTM2MTkzYjciLCJpYXQiOjE3NTAwMTA2NDd9.6a71PdrnTrl_T74wW2dn_34E6eTCxar1gzHO-2M4ykk";

    it("Bearer Token", () => {

        cy.request({
            method: "Get",
            url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            //cy.log(JSON.stringify(response.body))
            expect(response.body).have.length.greaterThan(0);

        })
    })


    it.only("API Key", () => {

        cy.request({
            method: "Get",
            url: "https://newsapi.org/v2/top-headlines",
            qs: {
                "country": "us",
                "apiKey": "68013bfeed34407591e30c5f69e70217"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq("ok")
            expect(response.body.articles).have.length.greaterThan(0);
        })


    })






})