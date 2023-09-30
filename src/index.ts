import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IBlocklyRegistry, BlocklyRegistry } from 'jupyterlab-blockly';

import { TOOLBOX } from './blocks';
import * as func_python from './python/func.js';
import * as func_js from './javascript/func.js';
import * as func_lua from './lua/func.js';
import * as func_dart from './dart/func.js';
import * as func_php from './php/func.js';

/**
 * Initialization data for the jupyterlab-blockly-blocks extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-blockly-blocks:plugin',
  autoStart: true,
  requires: [IBlocklyRegistry],
  activate: (app: JupyterFrontEnd, register: IBlocklyRegistry) => {
    console.log(
      'JupyterLab extension jupyterlab-blockly-blocks is activated!'
    );

    // Localization 
    let language = (register as BlocklyRegistry).language;
    import(`./msg/${language}.js`)
    .catch(() => {
      if (language !== 'En') {
        import(`./msg/En.js`)
        .catch(() => {});
      }
    });

    register.registerToolbox('blocks', TOOLBOX);
    register.registerCodes('python', func_python);
    register.registerCodes('javascript', func_js);
    register.registerCodes('lua', func_lua);
    register.registerCodes('dart', func_dart);
    register.registerCodes('php', func_php);
  }
};

export default plugin;

