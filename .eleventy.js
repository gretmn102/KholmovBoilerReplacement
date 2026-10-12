// @ts-check

/** @type {import('@11ty/eleventy')} */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "public" });

  return {
    dir: {
      input: "docs",
      output: "_site",
    },
  };
};