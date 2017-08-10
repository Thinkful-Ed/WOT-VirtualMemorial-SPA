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

    var vetName = 'Andrew';

    describe('Endpoint Request Verification Test', ()=>{
        it('should verify the "GET - ALL" endpoint.', ()=>{
            return chai.request(app)
                .get('/')
                .then((res)=>{
                    res.should.have.status(200);
                })
        });
        it('should verify the "GET - Specific" endpoint.', ()=>{
            return chai.request(app)
                .get('/')
                .then((res)=>{
                    res.should.have.status(200);
                })
        });
        it('should verify the "GET - Story" endpoint.', ()=>{
            return chai.request(app)
                .get('/text')
                .then((res)=>{
                    res.should.have.status(200);
                })
        });
        it('should verify the "POST - Text Story" endpoint.', ()=>{
            return chai.request(app)
                .post('/')
                .then((res)=>{
                    res.should.have.status(201);
                })
        });
        it('should verify the "PUT - Update Text Story" endpoint.', ()=>{
            return chai.request(app)
                .put('/')
                .then((res)=>{
                    res.should.have.status(202);
                })
        });
        it('should verify the "Delete - Single Text Story" endpoint.', ()=>{
            return chai.request(app)
                .delete('/')
                .then((res)=>{
                    res.should.have.status(204);
                })
        })
    });
});