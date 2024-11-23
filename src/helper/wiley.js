const cheerio = require("cheerio");

export function convertWileyBook(content) {
  // the book is wiley
  const $ = cheerio.load(content);

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

  // Change <b> tags to <strong>

  $("b").each((i, item) => (item.tagName = "strong"));
  $("span.bold").each((i, item) => (item.tagName = "strong"));
  // Change <i> tags to <em>

  $("i").each((i, item) => (item.tagName = "em"));
  $("span.italic").each((i, item) => (item.tagName = "em"));

  //update book headers

  $("p.h1").each((i, item) => (item.tagName = "h1"));
  $("p.h2").each((i, item) => (item.tagName = "h2"));
  $("p.h").each((i, item) => (item.tagName = "h3"));

  //update add blockquotes

  wrapHtmlTag("div.note", "<blockquote></blockquote>");
  wrapHtmlTag("div.list1", "<blockquote></blockquote>");
  wrapHtmlTag(".authorgroup", "<blockquote></blockquote>");

  // remove link in span.codelabel

  removeWrap("figcaption a");

  // remove figure.floatcenter
  removeWrap("figure.floatcenter");

  // remove figure.floatcenter
  removeWrap("div.figure");

  // change span.codelabel to kbd
  $("span.codelabel").each((i, item) => (item.tagName = "kbd"));

  // todo:code not yet working
  /* 
  $("aside[type='sidebar']").each((i, item) => (item.tagName = "blockquote"));
  removeWrap("section .toclist"); */

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
  removeWrap("article");
  removeWrap("aside");
  removeWrap("header");
  removeWrap("section");
  removeWrap("span");
  removeWrap("p span");
  removeWrap("figure");
  removeWrap("hr");
  removeWrap("div");

  //! issue: removes all images
  //! $("*").each(function(index, item) {
  //!   if ($(item).text() === "") {
  //!     $(item).remove();
  //!   }
  //! });

  $("*")
    .find("section")
    .each(function() {
      $(this).replaceWith($(this).html());
    });

  // Clean up <pre> tag from br and strong tags

  removeWrap("pre span");

  removeWrap("pre strong");

  $("code br").each(function() {
    $(this).replaceWith("\n");
  });

  $("pre br").each(function() {
    $(this).replaceWith("\n");
  });

  // Add p tag to all images with image-wrapper class

  const imgStyle = $('<p class="image-wrapper"></p>');
  $("img").wrap(imgStyle);

  // Update image class to lazyload

  $("img")
    .removeClass()
    .html();

  $("img").addClass("lazyload");

  // add f-center to figcation p
  $("figcaption p").addClass("f-center");

  // remove figcaption
  removeWrap("figcaption");

  // Remove <b> inside <pre> tags
  removeWrap("pre b");

  // Remove <strong> inside <pre> tags
  removeWrap("pre strong");

  // Remove <code> inside <pre> tags
  removeWrap("pre code");

  // convert code for a while

  $("p code").each((i, item) => (item.tagName = "kbd"));
  $("li code").each((i, item) => (item.tagName = "kbd"));
  $("p pre").each((i, item) => (item.tagName = "kbd"));

  // Add code tag to all pre tags

  const addPre = $("<pre></pre>");

  $("pre").each((i, item) => (item.tagName = "code"));
  $("code").wrap(addPre);

  // convert kbd back to code

  $("p kbd").each((i, item) => (item.tagName = "code"));
  $("li kbd").each((i, item) => (item.tagName = "code"));

  const cleanHTML = $.html();

  return cleanHTML;
}
