//////////////////////////////////////////////////////////////////
////// Navbar Toggle
const navarbToggleBtn = document.querySelector(".header__sidebar-toggle");
const header = document.querySelector(".header");

navarbToggleBtn.addEventListener("click", () => {
  header.classList.toggle("header--sidebar-open");
});
