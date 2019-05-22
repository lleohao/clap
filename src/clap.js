const camelCase = require('camelcase');

class Clap {
    constructor() {
        this.args = '';
        this.params = {};
        this.command = null;
    }

    parse(args) {
        this.args = args.trim();

        this.command = this._parseCommand();
        this.params = this._parseParamString();
    }

    _parseCommand() {
        const commandRe = /^([^-]+)\s+-/g;
        const result = commandRe.exec(this.args);

        return result ? result[1] : null;
    }

    /**
     * 拆分参数
     * @private
     */
    static splitParamsString(paramStr) {
        paramStr = paramStr.trim();
        const paramsStrLength = paramStr.length;

        let inSingleQuotation = false;
        let inDoubleQuotation = false;
        let viewSpace = false;

        for (let index = 0; index < paramsStrLength; index++) {
            let char = paramStr[index];

            if (char === '-') {
                if (viewSpace && (!inSingleQuotation || !inDoubleQuotation)) { // 遍历到费字符串内的空格, 且再次访问到 '-', 视为前一段命令结束
                    return paramStr.substring(0, index - 1);
                }
                continue;
            }

            if (char === ' ') {
                viewSpace = true;
                continue;
            }

            if (char === '"') {
                let preChar = paramStr[index - 1];

                if (preChar !== '\\') {
                    inDoubleQuotation = !inDoubleQuotation;
                }

                continue;
            }

            if (char === '\'') {
                let preChar = paramStr[index - 1];

                if (preChar !== '\\') {
                    inSingleQuotation = !inSingleQuotation;
                }
            }
        }

        return paramStr.substring(0, paramsStrLength);
    }

    /**
     * 从单个的配置参数中提取值
     * @param str
     * @private
     */
    static parseParam(str) {
        str = str.trim();
        let firstSpaceIndex = str.indexOf(' ');

        if (firstSpaceIndex === -1) {
            return {
                [camelCase(str)]: true
            };
        }

        let key = str.substring(0, firstSpaceIndex);
        let value = str.substr(firstSpaceIndex).trim();

        if (value === '') {
            value = true;
        }

        // 去掉字符串头尾的引号
        value = value.replace(/^['|"]/, '')
            .replace(/['|"]$/, '');

        // 去掉引号的转义字符
        value = value.replace(/\\(["'])/g, '$1');

        return {
            [camelCase(key)]: value.trim()
        };
    }

    _parseParamString() {
        const allParamStr = this.args.substr(this.command ? this.command.length : 0).trim();
        const paramStrLen = allParamStr.length;

        let index = 0;
        let params = {};

        while (index < paramStrLen) {
            const paramStr = Clap.splitParamsString(allParamStr.substr(index));
            const param = Clap.parseParam(paramStr);

            params = Object.assign(params, param);
            index += paramStr.length + 1;
        }

        return params;
    }
}

exports.Clap = Clap;
