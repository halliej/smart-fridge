/* eslint no-console: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');

describe('Smart Fridge unit test', () => {
  it('should return the root message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('Welcome to SmartFridge!');
      })
      .end(done);
  });

  it('should return the items that are at or below the fill factor of .4', (done) => {
    request(app)
      .get('/getItems/.4')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toEqual(1);
        expect(res.body[0].item.itemType).toEqual('cheese');
      })
      .end(done);
  });

  it('should return the items that are at or below the fill factor of .6', (done) => {
    request(app)
      .get('/getItems/.6')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toEqual(2);
        expect(res.body[0].item.itemType).toEqual('cheese');
        expect(res.body[1].item.itemType).toEqual('condiment');
      })
      .end(done);
  });

  it('should return the fill factor for the specified item', (done) => {
    request(app)
      .get('/getFillFactor/cheese')
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('0.20833333333333334');
      })
      .end(done);
  });

  it('should add the specified item', (done) => {
    request(app)
      .post('/handleItemAdded')
      .set('Accept', /json/)
      .send({
        itemType: 'bread',
        itemUUID: '696969',
        name: 'hot dog buns',
        idealQty: '8',
        quantity: '4',
        forget: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('added');
      })
      .end(done);
  });

  it('should update the quantity for the specified item', (done) => {
    request(app)
      .post('/handleItemAdded')
      .set('Accept', /json/)
      .send({
        itemUUID: '12345',
        quantity: '10'
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('updated');
      })
      .end(done);
  });

  it('should remove the specified quantity of the specified item', (done) => {
    request(app)
      .put('/handleItemRemoved')
      .send({
        itemUUID: '121212',
        quantity: '2'
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('removed');
      })
      .end(done);
  });

  it('should forget the specified item type', (done) => {
    request(app)
      .put('/forgetItem')
      .send({
        itemType: 'drink'
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('forgot');
      })
      .end(done);
  });
});
