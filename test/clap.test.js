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
        {commandLine: '--flag', expectValue: null},
        {commandLine: ' --flag --flag-boo', expectValue: null}
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
        expect(clap.params).toEqual({
            flag: true
        });
    });

    test(`'--flag-boo' => {flagBoo: true}`, () => {
        clap.parse('--flag-boo');
        expect(clap.params).toEqual({
            flagBoo: true
        });
    });

    test(`'   --flag     --flag-boo  ' => {flag: true, flagBoo: true}`, () => {
        clap.parse('   --flag     --flag-boo  ');
        expect(clap.params).toEqual({
            flagBoo: true,
            flag: true
        });
    });
});

describe('string argument', () => {

});

test('runtime test', () => {
    const query = `select * from "default.table", 'db1.table1' --union`;
    const params = `--flag "${query}" --user lleo`;

    let clap = new Clap();

    clap.parse('import --flag  --query   ');

});
