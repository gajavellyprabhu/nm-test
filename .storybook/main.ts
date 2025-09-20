import type { StorybookConfig } from "@storybook/nextjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config.resolve) {
      // 👇 Add alias so SCSS can resolve "assets/..."
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        assets: path.resolve(__dirname, "../src/assets"),
      };
    }

    // 👇 Patch sass-loader includePaths
    config.module?.rules?.forEach((rule: any) => {
      if (
        rule.test?.toString().includes("scss") ||
        rule.test?.toString().includes("sass")
      ) {
        rule.use.forEach((loader: any) => {
          if (loader.loader?.includes("sass-loader")) {
            loader.options = {
              ...loader.options,
              sassOptions: {
                ...(loader.options?.sassOptions ?? {}),
                includePaths: [path.resolve(__dirname, "../src")],
              },
            };
          }
        });
      }
    });

    return config;
  },
};

export default config;