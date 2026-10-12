// @ts-check

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig').default} EleventyConfig
 * @typedef {import('@11ty/eleventy/src/defaultConfig').defaultConfig} EleventyReturnValue
 * @type {(eleventyConfig: EleventyConfig) => EleventyReturnValue}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "public" });

  return {
    templateFormats: ["liquid", "md", "njk", "html", "11ty.js"],
    keys: {},
    dir: {
      input: "docs",
      output: "_site",
    },
  };
};
