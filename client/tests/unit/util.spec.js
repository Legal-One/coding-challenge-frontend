import { hourAndMinute, dateAndTime, firstAndLastName } from '../../src/utils';

describe('Utility Functions', () => {
    describe('Hour and Minute Date converter', () => {
        it('returns the right date format in hours and minutes', done => {
            const dateStub = '2020-10-05T14:48:00.000Z';

            const expectedOutput = '15:48';

            const formattedDate = hourAndMinute(dateStub);
            expect(formattedDate).toEqual(expectedOutput);
            done();
        });
    });

    describe('Date and Time converter', () => {
        it('returns the right date format in hours and minutes', done => {
            const dateStub = '2020-10-05T14:48:00.000Z';

            const expectedOutput = '10/5/2020 15:48:00';

            const formattedDate = dateAndTime(dateStub);
            expect(formattedDate).toEqual(expectedOutput);
            done();
        });
    });

    describe('Name Concatenator', () => {
        it('returns the firstName and lastNames', done => {
            const personStub = {
                firstName: 'John',
                lastName: 'Doe',
            };

            const expectedOutput = 'John Doe';

            const firstAndLastNameString = firstAndLastName(personStub);
            expect(firstAndLastNameString).toEqual(expectedOutput);
            done();
        });

        it('returns the firstName when the object does not have a last name specified', done => {
            const personStub = {
                firstName: 'John',
                lastName: '',
            };

            const expectedOutput = 'John';

            const firstAndLastNameString = firstAndLastName(personStub);
            expect(firstAndLastNameString).toEqual(expectedOutput);
            done();
        });

        it('returns an empty string when the firstName is not specified', done => {
            const personStub = {
                firstName: '',
                lastName: 'Doe',
            };

            const expectedOutput = '';

            const firstAndLastNameString = firstAndLastName(personStub);
            expect(firstAndLastNameString).toEqual(expectedOutput);
            done();
        });
    });
});
