const cheerio = require("cheerio");

export function convertPacktBook(content) {
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

  // look for .packt_tip and wrap it with <tip> as placeholder

  wrapHtmlTag("div[class*='packt_tip']", "<tipplaceholder1></tipplaceholder1>");

  removeWrap("div[class*='packt_tip'] p");
  $("div[class*='packt_tip']").each((i, item) => (item.tagName = "p"));

  wrapHtmlTag("p.packt_tip", "<tipplaceholder2></tipplaceholder2>");

  // look for .infobox and wrap it with <note>

  wrapHtmlTag(".packt_infobox", "<noteplaceholder1></noteplaceholder1>");

  removeWrap("div.packt_infobox p");
  $("div.packt_infobox").each((i, item) => (item.tagName = "p"));

  wrapHtmlTag("p.packt_infobox", "<noteplaceholder2></noteplaceholder2>");

  // look for .packt_quote

  wrapHtmlTag(".packt_quote", "<blockquote></blockquote>");

  $("blockquote div").each((i, item) => (item.tagName = "p"));

  // Update packt_figref to <p> wiht f-center class

  wrapHtmlTag(".packt_figref", "<centerText></centerText>");

  wrapHtmlTag(".cdpaligncenter1", "<centerText></centerText>");

  removeWrap("div.cdpaligncenter1");
  // remove div inside the <img >

  $("div .cdpaligncenter").each((i, item) => (item.tagName = "p"));

  // $("div .packt_figure1").each((i, item) => (item.tagName = "p"));

  // Remove unnecessary html elements for the books

  $("*")
    .removeAttr("class")
    .html();

  $("*")
    .removeAttr("id")
    .html();

  $("*")
    .removeAttr("title")
    .html();

  removeWrap("a[href*='#calibre']");

  removeWrap("div");
  removeWrap("article");
  removeWrap("aside");
  removeWrap("header");
  removeWrap("section");
  removeWrap("span");
  removeWrap("p span");

  //! issue: removes all images
  //! $("*").each(function(index, item) {
  //!   if ($(item).text() === "") {
  //!    $(item).remove();
  //!   }
  //! });

  // Remove <span> and <strong> inside <pre>

  removeWrap("pre span");

  removeWrap("pre strong");

  // Replace <br> to actual lines inside <pre>

  $("code br").each(function() {
    $(this).replaceWith("\n");
  });

  $("pre br").each(function() {
    $(this).replaceWith("\n");
  });

  // Add <p class="image-wrapper"> to all images

  const imgStyle = $('<p class="image-wrapper"></p>');
  $("img").wrap(imgStyle);

  // Add class of "lazyload" to <img>

  $("img")
    .removeClass()
    .html();

  $("img").addClass("lazyload");

  // Add <code> inside <pre>

  const addPre = $("<pre></pre>");

  $("pre").each((i, item) => (item.tagName = "code"));
  $("code").wrap(addPre);

  // Add styling to tip

  const addTipClass = $("<div class='box tip'></div>");

  wrapHtmlTag("tipplaceholder1 p", "<div class='body'></div>");
  wrapHtmlTag("tipplaceholder1", addTipClass);
  $("tipplaceholder1").prepend("<h4>Tip</h4>");

  // remove placeholder for tip
  removeWrap("tipplaceholder1");
  removeWrap("tipplaceholder2");

  // Add note styling to note
  const addNoteClass = $("<div class='box note'></div>");

  wrapHtmlTag("noteplaceholder1 p", "<div class='body'></div>");
  wrapHtmlTag("noteplaceholder1", addNoteClass);
  $("noteplaceholder1").prepend("<h4>Note</h4>");

  // remove placeholder for notes
  removeWrap("noteplaceholder2");
  removeWrap("noteplaceholder1");

  // convert <centertext> to <p class="f-center">
  $("centertext").addClass("f-center");
  $("centertext").each((i, item) => (item.tagName = "p"));

  const cleanHTML = $.html();

  return cleanHTML;
}
