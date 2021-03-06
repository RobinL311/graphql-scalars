/* global describe, it, expect */
import { Kind } from 'graphql/language';
import { GraphQLGUID } from '../src/scalars/GUID';

describe(`GUID`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(
        GraphQLGUID.serialize(`38336562-3634-6431-2d39-3264302d3400`),
      ).toEqual(`38336562-3634-6431-2d39-3264302d3400`);
    });

    it(`parseValue`, () => {
      expect(
        GraphQLGUID.parseValue(`38336562-3634-6431-2d39-3264302d3400`),
      ).toEqual(`38336562-3634-6431-2d39-3264302d3400`);
    });

    it(`parseLiteral`, () => {
      expect(
        GraphQLGUID.parseLiteral(
          {
            value: `38336562-3634-6431-2d39-3264302d3400`,
            kind: Kind.STRING,
          },
          {},
        ),
      ).toEqual(`38336562-3634-6431-2d39-3264302d3400`);
    });
  });

  describe(`invalid`, () => {
    describe(`not a valid GUID`, () => {
      it(`serialize`, () => {
        expect(() => GraphQLGUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GraphQLGUID.serialize(`this is not a guid`)).toThrow(
          /Value is not a valid GUID/,
        );
      });

      it(`parseValue`, () => {
        expect(() => GraphQLGUID.serialize(123)).toThrow(/Value is not string/);
        expect(() => GraphQLGUID.parseValue(`this is not a guid`)).toThrow(
          /Value is not a valid GUID/,
        );
      });

      it(`parseLiteral`, () => {
        expect(() =>
          GraphQLGUID.parseLiteral({ value: 123, kind: Kind.INT } as any, {}),
        ).toThrow(/Can only validate strings as GUIDs but got a/);

        expect(() =>
          GraphQLGUID.parseLiteral(
            { value: `this is not a guid`, kind: Kind.STRING },
            {},
          ),
        ).toThrow(/Value is not a valid GUID/);
      });
    });
  });
});
