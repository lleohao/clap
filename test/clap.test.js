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
    let clap;
    beforeEach(() => {
        clap = new Clap();
    });

    describe('without quotation', function () {
        test(`'--user name' => {user: 'name'}`, () => {
            clap.parse('--user name');
            expect(clap.params).toEqual({user: 'name'});
        });

        test(`'     --user        name' => {user: 'name'}`, () => {
            clap.parse('     --user        name');
            expect(clap.params).toEqual({user: 'name'});
        });

        test(`'--user    name        ' => {user: 'name'}`, () => {
            clap.parse('--user    name        ');
            expect(clap.params).toEqual({user: 'name'});
        });

        test(`'     --user    name        ' => {user: 'name'}`, () => {
            clap.parse('     --user    name        ');
            expect(clap.params).toEqual({user: 'name'});
        });

        test(`'--user name --pass pass' => {user: 'name', pass: 'pass'}`, () => {
            clap.parse('--user name --pass pass');
            expect(clap.params).toEqual({user: 'name', pass: 'pass'});
        });

        test(`'   --user name --pass pass' => {user: 'name', pass: 'pass'}`, () => {
            clap.parse('   --user name --pass pass');
            expect(clap.params).toEqual({user: 'name', pass: 'pass'});
        });

        test(`'   --user name --pass pass     ' => {user: 'name', pass: 'pass'}`, () => {
            clap.parse('   --user name --pass pass     ');
            expect(clap.params).toEqual({user: 'name', pass: 'pass'});
        });

        test(`'--user name --pass pass     ' => {user: 'name', pass: 'pass'}`, () => {
            clap.parse('--user name --pass pass     ');
            expect(clap.params).toEqual({user: 'name', pass: 'pass'});
        });

        test(`'--user   name       --pass   pass' => {user: 'name', pass: 'pass'}`, () => {
            clap.parse('--user   name       --pass   pass');
            expect(clap.params).toEqual({user: 'name', pass: 'pass'});
        });

        test(`'--user   name       --pass   pass  --table table' => {user: 'name', pass: 'pass', table: 'table'}`, () => {
            clap.parse('--user   name       --pass   pass  --table table');
            expect(clap.params).toEqual({user: 'name', pass: 'pass', table: 'table'});
        });
    });

    describe('with in quotation', function () {
        test(`'--query "\\"query\\""' => {query: '"query"'}`, () => {
            clap.parse('--query "\\"query\\""');
            expect(clap.params).toEqual({query: '"query"'});
        });

        test(`'--query '\\'query\\''' => {query: '"query"'}`, () => {
            clap.parse(`--query '\\'query\\''`);
            expect(clap.params).toEqual({query: '\'query\''});
        });

        test(`'--query "select * from \\"default\\".\\"table\\"" --user "\\'lleo\\'"' => {query: 'select * from "default"."table"', user: '\'lleo\'', }`, () => {
            clap.parse(`--query "select * from \\"default\\".\\"table\\"" --user "\\'lleo\\'"`);
            expect(clap.params).toEqual({query: 'select * from "default"."table"', user: '\'lleo\''});
        });
    });
});

describe('parse test', () => {
    let clap;
    beforeEach(() => {
        clap = new Clap();
    });

    test(`'import --flag' => {command: 'import', params: {flag: true}}`, () => {
        clap.parse('import --flag');
        expect(clap).toMatchObject({command: 'import', params: {flag: true}});
    });
});
