void (function () {
  document.body.addEventListener("click", handleBodyClicks);

  function handleBodyClicks(clickEvent) {
    /**
     * Handle header hamburger click
     */
    if (clickEvent.target.closest(".c-header__hamburger")) {
      const nav = document.querySelector(".c-header__nav-main");
      if (nav) {
        nav.classList.toggle("is-visible");
      }
      clickEvent.target
        .closest(".c-header__hamburger")
        .classList.toggle("is-open");
    }

    /**
     * Handle icon search
     */
    if (clickEvent.target.closest(".c-search-container")) {
      // clickEvent.preventDefault();
    }

    /**
     * Handle icon search click
     */
    if (
      clickEvent.target.closest(".c-search-container") &&
      !clickEvent.target.closest(".c-search-form")
    ) {
      clickEvent.target
        .closest(".c-search-container")
        .classList.toggle("is-clicked");
    }
  }
})();

void (function() {
  const pdpSubmitBtn = document.querySelector('button#submit_btn');
  const optionGroups = document.querySelectorAll('.c-option-group');

  if (!pdpSubmitBtn || optionGroups.length === 0) return;

  pdpSubmitBtn.addEventListener('mouseenter', () => {
    const selectedOptions = document.querySelectorAll('.c-option-group input[type="radio"]:checked');
    
    if (
      optionGroups.length === 2 &&
      selectedOptions.length !== 2
    ) {
      pdpSubmitBtn.textContent = 'Please select a size and color';
      pdpSubmitBtn.disabled = true;
    }
  });

  pdpSubmitBtn.addEventListener('mouseleave', () => {
    pdpSubmitBtn.textContent = 'Add to cart';
    pdpSubmitBtn.disabled = false;
  });
})();
