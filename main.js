function loadPage(page) {
  if(page == null || page == "") {
    page = window.location.pathname;
  }
  if(page == "/") {
    page = "/home";
  }
  $("#content").load(page + "/page.html");
  if(page == "/home") {
    page = "/";
  }
  window.history.pushState("", page, page);
}
