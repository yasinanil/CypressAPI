describe("Http Request", () => {


    it("Get Request", () => {

        cy.request("Get", "https://jsonplaceholder.typicode.com/posts/1")
            .its("status")
            .should("equal", 200)

    })

    it("Post Request", () => {

        cy.request({

            method: "Post",
            url: "https://jsonplaceholder.typicode.com/posts",
            body: {
                title: 'Test Post',
                body: 'This is a test call',
                userId: 1
            }

        })
            .its("status")
            .should("equal", 201)


    })

    it("Put Request", () => {

        cy.request({

            method: "Put",
            url: "https://jsonplaceholder.typicode.com/posts/7",
            body: {
                "title": "Test Put",
                "body": "This is a test put call",
                "userId": 1
            }
        })
            .its("status")
            .should("equal", 200)

    })

    it("Delete Request", () => {

        cy.request({

            method: "Delete",
            url: "https://jsonplaceholder.typicode.com/posts/7"

        })
            .its("status")
            .should("equal", 200)

    })


    //Alternative
    it.only("Delete Request", () => {

        cy.request("Delete", "https://jsonplaceholder.typicode.com/posts/7")
            .its("status")
            .should("equal", 200)

    })



})