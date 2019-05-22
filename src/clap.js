class Clap {
    constructor() {
        this.args = '';
        this.params = {};
        this.command = null;
    }

    parse(args) {
        this.args = args.trim();

        this.command = this._parseCommand();
    }

    _parseCommand() {
        const commandRe = /\b([^-]+)\s+-/g;
        const result = commandRe.exec(this.args);

        return result ? result[1] : null;
    }

    getParams() {
        return this.params;
    }
}

exports.Clap = Clap;
