import pluginTester from "babel-plugin-tester";
import plugin from "../src";
import path from "path";

pluginTester({
  plugin,
  pluginName: "anonymize",
  fixtures: path.join(__dirname, "__fixtures__"),
  babelOptions: {
    parserOpts: {
      plugins: ["jsx", "typescript"],
    },
  },
});
