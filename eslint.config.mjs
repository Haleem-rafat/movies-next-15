import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/jsx-key": "warn",
      "react/prop-types": "off",
      "react/display-name": "warn",
      "react/no-children-prop": "warn",
      "react/react-in-jsx-scope": "off",
      "react/button-has-type": "warn",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error",
      "no-case-declarations": "warn",
      "no-console": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-unsafe-optional-chaining": "warn",
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling"]
        }
      ]
    },
    settings: {
      "react": {
        "version": "detect"
      },
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  }
];

export default eslintConfig;
