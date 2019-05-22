const {Clap} = require('../src/clap');

test('constructor test', () => {
    const clap = new Clap();

    expect(clap).toBeInstanceOf(Clap);
});

describe('command argument', () => {
    let clap;
    beforeEach(() => {
        clap = new Clap();
    });

    const cases = [
        {commandLine: 'command --a --b', expectValue: 'command'},
        {commandLine: '    command --a --b     ', expectValue: 'command'},
        {commandLine: '--a', expectValue: null},
        {commandLine: ' --a', expectValue: null}
    ];

    cases.forEach(({commandLine, expectValue}) => {
        test(`'${commandLine}' => ${expectValue}`, () => {
            clap.parse(commandLine);
            expect(clap.command).toEqual(expectValue);
        });
    });
});

describe('boolean argument', () => {
    let clap;
    beforeEach(() => {
        clap = new Clap();
    });

    test(`'--flag' => {flag: true}`, () => {
        clap.parse('--flag');
        expect(clap.getParams()).toEqual({
            flag: true
        });
    });

    test(`'--flag-boo' => {flagBoo: true}`, () => {
        clap.parse('--flag-boo');
        expect(clap.getParams()).toEqual({
            flagBoo: true
        });
    });

    test(`'   --flag     --flag-boo  ' => {flag: true, flagBoo: true}`, () => {

    });
});

describe('string argument', () => {

});
