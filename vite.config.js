import { createFilter } from "vite";

/**@type {import("vite").UserConfig} */
export default {
  plugins: [parse_html_component()],
};

/**@returns {import("vite").PluginOption} */
function parse_html_component() {
  let f = createFilter("src/**/*.html?inline");

  return {
    transform(src, id) {
      if (!f(id)) return;

      return {
        code: `export default \`${src}\``,
      };
    },
  };
}
