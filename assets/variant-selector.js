class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.productVariants = JSON.parse(
      this.querySelector("#product_variants").textContent
    );
    this.addEventListener("change", this.onVariantChange);
    this.disableUnavailableOptions();
  }

  onVariantChange() {
    // Get selected options from select elements
    let selectedOptions = Array.from(
      this.querySelectorAll("select"),
      (selectEl) => selectEl.value
    ).join(" / ");

    // Get selected options from radio elements if select elements are not available
    if (!selectedOptions) {
      selectedOptions = Array.from(
        this.querySelectorAll("input[type='radio']:checked"),
        (radioEl) => radioEl.value
      ).join(" / ");
    }

    const variant = this.productVariants.find(
      (variant) => variant.title === selectedOptions
    );

    if (!variant) {
      return console.warn("Saabbir: Variant not found");
    }

    // Set shopify product form variant id
    document.querySelector('.shopify-product-form input[name="id"]').value = variant.id;

    // Update current url with variant id
    window.history.replaceState({}, "", `?variant=${variant.id}`);

    this.updatePriceAndAvailability(variant);
  }

  disableUnavailableOptions() {
    if (!document.querySelector('.c-option-group')) return;

    const availableVariants = this.productVariants.filter(variant => variant.available);
    const optionInputs = document.querySelectorAll('.c-option-group input');
    const optionGroups = document.querySelectorAll('.c-option-group');
    const sizeOptionInputs = optionGroups[0].querySelectorAll('input');
    const colorOptionInputs = optionGroups[1].querySelectorAll('input');
  
    // Function to update options
    function updateOptions() {
      // Get selected values for size and leg length
      const selectedSize = document.querySelector('input[name="options[Size]"]:checked')?.value;
      const selectedColor = document.querySelector('input[name="options[Color]"]:checked')?.value;

      if (selectedSize) {
        // Loop through color options
        colorOptionInputs.forEach(input => {
          const colorValue = input.value;
          let isOptionAvailable = false;
    
          // Check if this color is available for the selected size
          for (const variant of availableVariants) {
            if (
              variant.options[0] === selectedSize &&
              variant.options[1] === colorValue
            ) {
              isOptionAvailable = true;
              break;
            }
          }
    
          // Enable/disable the color option
          input.disabled = !isOptionAvailable;
          input.parentElement.classList.toggle('is-unavailable', !isOptionAvailable);
        });
      }
  
      if (selectedColor) {
        // Loop through size options
        sizeOptionInputs.forEach(input => {
          const sizeValue = input.value;
          let isOptionAvailable = false;
    
          // Check if this size is available for the selected color
          for (const variant of availableVariants) {
            if (
              variant.options[0] === sizeValue &&
              variant.options[1] === selectedColor
            ) {
              isOptionAvailable = true;
              break;
            }
          }
    
          // Enable/disable the size option
          input.disabled = !isOptionAvailable;
          input.parentElement.classList.toggle('is-unavailable', !isOptionAvailable);
        });
      }
    }
  
    // Add event listeners to size and color options
    optionInputs.forEach(input => input.addEventListener('change', updateOptions));
  
    // Initialize options on page load
    updateOptions();
  }

  async updatePriceAndAvailability({ id, available }) {
    // Set variant availability
    const submitBtn = document.querySelector("#submit_btn");
    if (!available) {
      submitBtn.setAttribute("disabled", "disabled");
      submitBtn.textContent = "Sold out";
    } else {
      submitBtn.removeAttribute("disabled");
      submitBtn.textContent = "Add to cart";
    }

    const endpoint = `${this.dataset.url}?variant=${id}&section_id=${this.dataset.section}`;
    const response = await fetch(endpoint);
    const text = await response.text();
    const html = new DOMParser().parseFromString(text, "text/html");
    const newPrice = html.querySelector("#price").innerHTML;
    const newCompareAtPrice = html.querySelector("#compare_at_price").innerHTML;

    if (newPrice && newCompareAtPrice) {
      document.querySelector("#price").innerHTML = newPrice;
      document.querySelector("#compare_at_price").innerHTML = newCompareAtPrice;
    }
  }
}

customElements.define("variant-selector", VariantSelector);
