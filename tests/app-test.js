//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import {ComponentOne} from "../src/component1";
import {expect} from 'chai';
import {describe, it} from 'mocha';

describe('ComponentOne', () => {
    it('throwError() should throw error with specified message', () => {
        let component = new ComponentOne();
        expect(() => component.throwError('Test error')).to.throw();
    });

    it('helloWorld() should provide world with nice greeting', () => {
        let component = new ComponentOne();
        expect(component.createHelloWorld()).to.own.include({hello: 'world'});
    });

    it('helloWorld() should be successful', () => {
        let component = new ComponentOne();
        expect(component.createHelloWorld()).to.own.include({success: true});
    });

    it('seven() should be exactly euqal to 7', () => {
        let component = new ComponentOne();
        expect(component.seven()).to.equal(7);
    });
});