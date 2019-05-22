const {Clap} = require('../src/clap');

describe('Clap test', function () {
    test('constructor test', () => {
        const clap = new Clap();

        expect(clap).toBeInstanceOf(Clap);
    });
});
