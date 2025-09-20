import fs from 'fs';
import path from 'path';
// import  {
//   ComponentFile,
//   PackageDefinition,
// } from './templates/component-factory';
import { watchItems } from './utils';

/*
  COMPONENT FACTORY GENERATION
  Generates the `/src/temp/componentFactory.ts` file, which maps JSS React components
  to Sitecore renderings.

  The component factory is a mapping between a string name and a React component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.

  Generating the componentFactory is optional, and it can be maintained manually if preferred.

  The default convention uses the component's filename (without the extension) as the component
  name. For example, the file `/components/ComponentName.ts` would map to component `ComponentName`.
  This can be customized in writeComponentFactory().

  This script supports two modes. In default mode, the component factory file is written once.
  In watch mode, the component factory source folder is watched, and componentFactory.ts is
  regenerated whenever files are added or deleted. Run in watch mode by passing a `--watch` argument
  when calling the script.
*/

const componentFactoryPath = path.resolve('src/temp/componentBuilder.js');
const componentRootPath = 'src/components';

const isWatch = process.argv.some((arg) => arg === '--watch');

(isWatch ? watchComponentFactory : writeComponentFactory)();

/**
 * Watches component directory for changes. When files are added or deleted, the component factory
 * file (componentFactory.ts) is regenerated. This is used during `jss start` to pick up new or
 * removed components at runtime.
 */
function watchComponentFactory() {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`);

  watchItems(componentRootPath, writeComponentFactory);
}

function writeComponentFactory() {
  const componentFactory = generateComponentFactory();

  console.log(`Writing component factory to ${componentFactoryPath}`);

  fs.writeFileSync(componentFactoryPath, componentFactory, { encoding: 'utf8' });
}
/**
 * Generates the component factory file and saves it to the filesystem.
 * By convention, we expect to find React components under src/components/** (subfolders are
 * searched recursively). The filename, with the extension stripped, is used for the component's
 * string name (for mapping to Sitecore). The filename, with extension and non-word characters
 * stripped, is used to identify the component's JavaScript module definition (for initializing
 * new component instances in code).
 * Modify this function to use a different convention.
 */
function generateComponentFactory() {
  const imports = [];
  const registrations = [];

  /**
   * You can specify components which you want to import from external/internal packages
   * in format:
   *  {
   *    name: 'package name',
   *    components: [
   *      {
   *        componentName: 'component name', // component rendering name,
   *        moduleName: 'module name' // component name to import from the package
   *      }
   *    ]
   *  }
   */
  const packages = [];
  if (!!packages.length) {
    packages.forEach((p) => {
      const variables = p.components
        .map((c) => {
          registrations.push(`components.set('${c.componentName}', ${c.moduleName});`);

          return c.moduleName;
        })
        .join(', ');

      imports.push(`import { ${variables} } from '${p.name}'`);
    });
  }

  const componentsToRenderWithMultipleVariations = {
    HeroBanner: ['Default', 'FullWidthOverlay'],
    InfoBanner: ['Default', 'ErrorMessage'],
    MembersListing: ['Default', 'CommitteeMemberListing', 'MemberListingWithPopup'],
    Navigation: ['Sitemap'],
    PageContent: ['RichContent'],
    SearchResult: ['GlobalSearch', 'FAQsListing', 'Default', 'LatestNews', 'NewsListing'],
    PartialDesignDynamicPlaceholder: ['default'],
    SquareGrid:['Default', 'SquareGridVideo360']
  };
  const componentsToRenderWithDefaultExport = {
    PartialDesignDynamicPlaceholder: ['default'],
  };

  fs.readdirSync(componentRootPath).forEach(
    (componentFolder) => {
      const importVarName = componentFolder.replace(/[^\w]+/g, '');
      const variationArrayToMap = componentsToRenderWithMultipleVariations?.[importVarName];
      const componentToRenderDefault = componentsToRenderWithDefaultExport?.[importVarName];

      // const componentFolderFullPath = path.join(componentRootPath, componentFolder);

      // if (
      //   fs.existsSync(path.join(componentFolderFullPath, 'index.js')) ||
      //   fs.existsSync(path.join(componentFolderFullPath, 'index.jsx'))
      // ) {
      if (!!componentToRenderDefault) {
        imports.push(`const ${importVarName} = dynamic(() =>
        import('src/components/${importVarName}/${importVarName}').then((module) => ({
          default: module.default,
        }))
      );`);
        registrations.push(`components.set('${componentFolder}', ${importVarName});`);
      } else if (!!variationArrayToMap) {
        let componentFunctions = [];
        variationArrayToMap?.map((item) => {
          imports.push(`const ${importVarName}${item} = dynamic(() =>
          import('src/components/${importVarName}/${importVarName}').then((module) => ({
            default: module.${item},
          }))
        );`);
          componentFunctions.push(`${item} : ${importVarName}${item}`);
        });
        registrations.push(`const ${importVarName} = { ${componentFunctions} };\
        components.set('${componentFolder}', ${importVarName});`);
      } else {
        console.debug(`Registering JSS component ${componentFolder}`);
        // imports.push(`import * as ${importVarName} from '@components/${componentFolder}';`);
        imports.push(`const ${importVarName} = dynamic(() =>
      import('src/components/${importVarName}/${importVarName}').then((module) => ({
        default: module.Default,
      }))
    );`);

        registrations.push(`components.set('${componentFolder}', ${importVarName});`);
      }
    }
    // }
  );

  return `/* eslint-disable */
// Do not edit this file, it is auto-generated at build time!
// See scripts/generate-component-factory.js to modify the generation of this file.
import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-nextjs';

import { BYOCWrapper, FEaaSWrapper } from '@sitecore-jss/sitecore-jss-nextjs';
import dynamic from 'next/dynamic';
${imports.join('\n')}

const components = new Map();
${registrations.join('\n')}

export const componentBuilder = new ComponentBuilder({ components });

export const moduleFactory = componentBuilder.getModuleFactory();
`;
}
