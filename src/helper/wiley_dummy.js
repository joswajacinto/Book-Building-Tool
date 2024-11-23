const cheerio = require("cheerio");

export function convertWileyDummyBook(content) {
  // the book is wiley
  const $ = cheerio.load(content);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function wrapHtmlTag(item, wrapWith) {
    $(item)
      .wrap(wrapWith)
      .html();
  }

  function wrapHtmlPrent(item, wrapWith) {
    $(item)
      .parent()
      .wrap(wrapWith)
      .html();
  }

  function removeWrap(item) {
    $(item).each(function() {
      $(this).replaceWith($(this).html());
    });
  }

  function checkTipValue(type) {
    if (type === "remember") {
      return "note";
    } else if (type === "techstuff") {
      return "attention";
    } else {
      return type;
    }
  }

  function wrapAttentionStyle(type) {
    wrapHtmlTag(`${type} p`, "<div class='body'></div>");
    wrapHtmlTag(type, `<div class='box ${checkTipValue(type)}'></div>`);
    $(type).prepend(
      `<h4>${capitalizeFirstLetter(
        type === "techstuff" ? "Technical Stuff" : type
      )}</h4>`
    );

    // remove placeholder tag
    removeWrap(type);
  }

  // Change <b> tags to <strong>

  $("b").each((i, item) => (item.tagName = "strong"));

  // Change <i> tags to <em>

  $("i").each((i, item) => (item.tagName = "em"));

  // add temporary tags for attention sections

  wrapHtmlPrent("img[alt=remember]", "<remember></remember>");
  wrapHtmlPrent("img[alt=warning]", "<warning></warning>");
  wrapHtmlPrent("img[alt=tip]", "<tip></tip>");
  wrapHtmlPrent("img[alt=technicalstuff]", "<techstuff></techstuff>");

  // remove images for icons
  removeWrap("img[alt=remember]");
  removeWrap("img[alt=warning]");
  removeWrap("img[alt=tip]");
  removeWrap("img[alt=technicalstuff]");

  // remove div.figure
  removeWrap("div.figure");

  // change p.code to pre tag
  $("p.code").each((i, item) => (item.tagName = "pre"));
  $("p.code1").each((i, item) => (item.tagName = "pre"));

  // convert sidebar to blockquote
  $("div.sidebar").each((i, item) => (item.tagName = "blockquote"));

  // convert code inside paragraph to kbd
  $("p code").each((i, item) => (item.tagName = "kbd"));

  // Clear classes of all html element

  $("*")
    .removeAttr("class")
    .html();

  $("*")
    .removeAttr("id")
    .html();

  $("*")
    .removeAttr("title")
    .html();
  removeWrap("a[href*='#calibre_link-']");

  removeWrap("div");
  removeWrap("article");
  removeWrap("aside");
  removeWrap("header");
  removeWrap("span");
  removeWrap("p span");
  removeWrap("section");
  removeWrap("div section");
  // Clean up <pre> tag from br and strong tags

  removeWrap("pre span");

  removeWrap("pre strong");

  $("code br").each(function() {
    $(this).replaceWith("\n");
  });

  $("pre br").each(function() {
    $(this).replaceWith("\n");
  });

  // update figure and figcaption to proper styling

  $("figcaption p").addClass("f-center");
  removeWrap("figure");
  removeWrap("figcaption");
  // Add p tag to all images with image-wrapper class

  const imgStyle = $('<p class="image-wrapper"></p>');
  $("img").wrap(imgStyle);

  // Update image class to lazyload

  $("img")
    .removeClass()
    .html();

  $("img").addClass("lazyload");

  // Add styling to tip
  wrapAttentionStyle("remember");
  wrapAttentionStyle("tip");
  wrapAttentionStyle("warning");
  wrapAttentionStyle("techstuff");

  // Add style on center p
  $("centertext").addClass("f-center");
  $("centertext").each((i, item) => (item.tagName = "p"));

  const cleanHTML = $.html();

  return cleanHTML;
}
