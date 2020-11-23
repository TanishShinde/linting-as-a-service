const shellCheckSupportedTypes = ['sh', 'bash', 'dash', 'ksh' ];
import child_process = require("child_process");
const fs = require('fs');

export interface ShellCheckRequest {
  script: string,
  type: string,
}

export interface ShellCheckArrayElement {
  file: string,
  line: number,
  column: number,
  endColumn: number,
  level: string,
  code: number,
  message: string,
  fix: string
}

export interface ShellCheckResponse {
  lint: ShellCheckArrayElement[],
  status: boolean
}

export class Helper {
  static safeJSONParser(body: string): any {
    try {
      return JSON.parse(body);
    } catch (e) {
      return {};
    }
  }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static isValidShellCheckRequest(req: ShellCheckRequest): boolean {
    if (!req.hasOwnProperty('script')) {
      return false;
    }
    if (!req.hasOwnProperty('type')) {
      return false;
    }
    if (!shellCheckSupportedTypes.includes(req.type)) {
      return false;
    }
    return true;
  }

  static writeScript(script: string, type: string): string {
    const rand: number = Helper.getRandomInt(10000);
    const fileName: string = `tmpFiles/${rand}.${type}`;
    fs.writeFileSync(fileName, script);
    return fileName;
  }

  static runShellCheck(fileName: string, type: string): ShellCheckResponse {
    const command: string = `./scripts/wrapper.sh shellcheck -f json -s ${type} ${fileName}`;
    let shellCheckResponse: ShellCheckResponse = {
      lint: [],
      status: true
    };
    let shellCheckOutput: ShellCheckArrayElement[];
    let shellCheckOutputString: string = '';
    try {
      shellCheckOutputString = (child_process.execSync(command)).toString();
    } catch (e) {
      shellCheckResponse.status = false;
      console.log(`runShellCheck:: Error during execSync = ${JSON.stringify(e)}`);
    }
    shellCheckOutput = Helper.safeJSONParser(shellCheckOutputString);
    try {
      fs.unlinkSync(fileName)
    } catch (e) {
      console.log(`runShellCheck:: Error during unlinkSync = ${JSON.stringify(e)}`);
    }
    shellCheckResponse.lint = shellCheckOutput;
    return shellCheckResponse;
  }
}
