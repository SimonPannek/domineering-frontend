// Imports
const transforms = require("./transforms");

module.exports = config => {

    // Data merge
    config.setDataDeepMerge(true);

    // Pass through
    config.addPassthroughCopy("src/assets/favicon/*");

    // Layouts
    config.addLayoutAlias("default", "layouts/default.njk");

    // Transforms
    config.addTransform('purge-styles', transforms.purgeStyles);
    config.addTransform("minify", transforms.minify);

    return {
        dir: {
            input: "src",
            output: "build"
        },
        templateFormats: ["md", "njk", "html"],
        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    }
}
