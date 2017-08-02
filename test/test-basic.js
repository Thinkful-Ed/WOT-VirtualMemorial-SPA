// Imports & Init
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

// Reference Linking
const should = chai.should(); // Lets us use should syntax in our test.

// Middleware
chai.use(chaiHttp);

describe('Memorial Testing', ()=>{
    /*Before init chai testing we need to start the applications servers.
    * Express app and server funtionality is imported from server.js to
    * the testing module for use.*/
    before(()=>{
        return runServer()
    });
/*    beforeEach(console.log('Placeholder: ""beforeEach'));
    afterEach(console.log('Placeholder: "afterEach"'));*/
    after(()=>{
        return closeServer()
    });

    describe('Endpoint Request Verification Test', ()=>{
        it('should verify the "/" - "GET" endpoint responds', ()=>{
            return chai.request(app)
                .get('/')
                .then((res)=>{
                    res.should.have.status(200);
                })
        });
        /*it('should verify the "/:search" - "GET" endpoint responds', ()=>{
            // Testing
        });*/
       /* it('should verify the "/vetID-123456789" - "POST" endpoint responds', ()=>{
            // Testing
        });*/
       /* it('should verify the "/:id/:storyID" - "PUT" endpoint responds', ()=>{
            // Testing
        });*/
       /* it('should verify the "/:id/:storyID" - "DEL" endpoint responds', ()=>{
            // Testing
        });*/
    });
    /*describe('Database Query Test', ()=>{

    });*/
    /*describe('CRUD User Story Test', ()=>{

    });*/
});