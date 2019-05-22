const {Clap} = require('../src/clap');


describe('parse test', () => {
    let clap;
    beforeEach(() => {
        clap = new Clap();
    });

    describe('parse command', () => {
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

    describe('parse boolean', () => {
        const cases = [
            {commandLine: `--flag`, expectValue: {flag: true}},
            {commandLine: `--flag-boo`, expectValue: {flagBoo: true}},
            {commandLine: `   --flag     --flag-boo  `, expectValue: {flag: true, flagBoo: true}}
        ];

        cases.forEach(({commandLine, expectValue}) => {
            test(`'${commandLine}' => ${expectValue}`, () => {
                clap.parse(commandLine);
                expect(clap.params).toEqual(expectValue);
            });
        });
    });

    describe('parse string', () => {
        describe('without quotation', function () {
            const cases = [
                {commandLine: `--user name`, expectValue: {user: 'name'}},
                {commandLine: `--user    name`, expectValue: {user: 'name'}},
                {commandLine: `  --user name`, expectValue: {user: 'name'}},
                {commandLine: `--user name  `, expectValue: {user: 'name'}},
                {commandLine: `--user name --pass pass`, expectValue: {user: 'name', pass: 'pass'}},
                {commandLine: `--user name   --pass pass`, expectValue: {user: 'name', pass: 'pass'}},
                {commandLine: `--user name --pass pass --table table`, expectValue: {user: 'name', pass: 'pass', table: 'table'}},
            ];

            cases.forEach(({commandLine, expectValue}) => {
                test(`'${commandLine}' => ${expectValue}`, () => {
                    clap.parse(commandLine);
                    expect(clap.params).toEqual(expectValue);
                });
            });
        });

        describe('with in quotation', function () {
            const cases = [
                {commandLine: `--query "\\"query\\""`, expectValue: {query: '"query"'}},
                {commandLine: `--query "\\'query\\'"`, expectValue: {query: '\'query\''}},
                {commandLine: `--query '\\"query\\"'`, expectValue: {query: '"query"'}},
                {commandLine: `--query '\\'query\\''`, expectValue: {query: '\'query\''}},
                {commandLine: `--query "select * from \\"default\\".\\"table\\"" --user "\\'lleo\\'"`, expectValue: {query: 'select * from "default"."table"', user: '\'lleo\''}},
            ];

            cases.forEach(({commandLine, expectValue}) => {
                test(`'${commandLine}' => ${expectValue}`, () => {
                    clap.parse(commandLine);
                    expect(clap.params).toEqual(expectValue);
                });
            });
        });
    });

    test(`'import --flag' => {command: 'import', params: {flag: true}}`, () => {
        clap.parse('import --flag');
        expect(clap).toMatchObject({command: 'import', params: {flag: true}});
    });
});
