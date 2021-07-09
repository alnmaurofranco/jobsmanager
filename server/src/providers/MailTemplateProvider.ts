import ejs from 'ejs';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplate): Promise<string>;
}

export default class MailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = ejs.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
