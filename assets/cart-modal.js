const dq = document.querySelector.bind(document);
const dqa = document.querySelectorAll.bind(document);

class CartModal extends HTMLElement {
  constructor() {
    super();
    this.cartModalWrapperEl = this.querySelector(".c-cart-modal-wrapper");
    this.cartModalEl = this.querySelector(".c-cart-modal");
    this.closeIconEl = this.querySelector(".c-cart-modal__close-icon");
    this.navCartLinkEl = dq(`.c-header__nav-cart-link[href="/cart"]`);
    this.registerEvents();
  }

  registerEvents() {
    this.addEventListener("click", this.handleAllCartModalClicks);

    // Handle nav cart link click
    this.navCartLinkEl?.addEventListener("click", (e) => {
      e.preventDefault();
      this.showModal();
    });

    // Handle all add to cart form submit
    dqa('form[action="/cart/add"]').forEach((form) =>
      form.addEventListener("submit", this.handleAddToCartFormSubmit.bind(this))
    );
  }

  handleAllCartModalClicks(clickEvent) {
    // Handle cart modal close icon click
    // and click outside cart modal
    if (
      clickEvent.target.closest(".c-cart-modal__close-icon") ||
      !clickEvent.target.closest(".c-cart-modal")
    ) {
      this.hideModal();
    }

    // Handle line item qty plus minus btn click
    if (clickEvent.target.closest(`.c-cart-modal__line-item-qty > button`)) {
      const qtyBtn = clickEvent.target.closest(
        `.c-cart-modal__line-item-qty > button`
      );
      this.handleQtyUpdate(qtyBtn);
    }

    // Handle line item remove click
    if (clickEvent.target.closest(".c-cart-modal__line-item-remove")) {
      const removeBtn = clickEvent.target.closest(
        ".c-cart-modal__line-item-remove"
      );
      this.handleRemoveLineItem(removeBtn);
    }

    // Handle clear cart btn click
    if (clickEvent.target.closest("#clear-cart")) {
      this.handleClearCart();
    }
  }

  async handleClearCart() {
    const res = await fetch("/cart/clear.js", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sections: "section-cart-modal",
      }),
    });
    const { sections } = await res.json();
    this.updateCartModal(sections["section-cart-modal"]);
  }

  async handleAddToCartFormSubmit(e) {
    e.preventDefault();

    const body = new FormData(e.target);
    body.append("sections", "section-cart-modal");

    try {
      const { sections } = await (
        await fetch("/cart/add.js", {
          method: "post",
          body,
        })
      ).json();

      this.updateCartModal(sections["section-cart-modal"]);
      this.showModal();
      this.updateNavCartCount();
    } catch (ex) {
      alert(ex);
      console.error(ex);
    }
  }

  async updateNavCartCount(count) {
    console.log("Saabbir:", "updateNavCartCount fn ran", count);

    if (count === undefined) {
      const { item_count } = await (await fetch("/cart.js")).json();
      count = item_count;
    }

    const supEl = this.navCartLinkEl.querySelector("sup");
    if (supEl) {
      console.log("Saabbir:", "inside if", count);

      supEl.textContent = count;
      supEl.dataset.isCartEmpty = count > 0 ? "no" : "yes";
    }
  }

  async handleQtyUpdate(qtyBtn) {
    const isUp = qtyBtn.classList.contains("c-cart-modal__line-item-qty-plus");
    const currentQty = +qtyBtn.parentElement.querySelector("input").value;
    const newQty = isUp ? currentQty + 1 : currentQty - 1;
    const lineItemKey = qtyBtn.closest(".c-cart-modal__line-item").dataset
      .lineItemKey;

    const res = await fetch("/cart/update.js", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updates: {
          [lineItemKey]: newQty,
        },
        sections: "section-cart-modal",
      }),
    });
    const { sections, item_count } = await res.json();

    this.updateCartModal(sections["section-cart-modal"]);
    this.updateNavCartCount(item_count);
  }

  async handleRemoveLineItem(removeBtn) {
    const lineItemKey = removeBtn.closest(".c-cart-modal__line-item").dataset
      .lineItemKey;
    const res = await fetch("/cart/update.js", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updates: {
          [lineItemKey]: 0,
        },
        sections: "section-cart-modal",
      }),
    });
    const { sections, item_count } = await res.json();

    this.updateCartModal(sections["section-cart-modal"]);
    this.updateNavCartCount(item_count);
  }

  updateCartModal(htmlText) {
    const sectionHtml = new DOMParser().parseFromString(htmlText, "text/html");
    this.cartModalEl.innerHTML =
      sectionHtml.querySelector(".c-cart-modal").innerHTML;
  }

  hideModal() {
    this.cartModalWrapperEl.classList.remove("is-active");
  }

  showModal() {
    this.cartModalWrapperEl.classList.add("is-active");
  }
}

customElements.define("cart-modal", CartModal);
