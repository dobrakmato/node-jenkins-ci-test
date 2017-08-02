import {expect} from 'chai';
import {describe, it} from 'mocha';
import fields from "../src/fields";

describe('fields() helper function', () => {

    it('should return only allowed fields', () => {
        expect(fields('luke,leia,vader,yoda', ['luke', 'leia', 'han', 'yoda'])).to.deep.equal(['luke', 'leia', 'yoda']);
        expect(fields('luke,leia,,,', ['luke', 'leia', 'han', 'yoda'])).to.deep.equal(['luke', 'leia']);
    });

    it('should return no fields', () => {
        expect(fields('', null)).to.deep.eq([]);
        expect(fields('', [])).to.deep.eq([]);
        expect(fields('', ['id', 'name', 'created_at'])).to.deep.eq([]);
        expect(fields('cat,dog,pet', ['id', 'name', 'created_at'])).to.deep.eq([]);
        expect(fields('cat,dog', [])).to.deep.eq([]);
        expect(fields('cat,', [])).to.deep.eq([]);
    });

    it('should return only specified amount of fields', () => {
        expect(fields('cat,dog,fox,bear', ['cat', 'dog', 'fox', 'bear'], 3)).to.have.lengthOf(3);
    });

});