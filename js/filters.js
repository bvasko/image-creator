
let ImageFilters = {
  imageContainer: '#image-container',
  filterOptions: {
    blur: {
      intensity: '',
      unit: 'px',
      value: '3'
    },
    brightness: {
      intensity: '',
      unit: '',
      value: '3'
    },
    contrast: {
      intensity: '',
      unit: '%',
      value: '100'
    },
    grayscale: {
      intensity: '',
      unit: '%',
      value: '100'
    },
    'hue-rotate': {
      intensity: '',
      unit: 'deg',
      value: '100'
    },
    invert: {
      intensity: '',
      unit: '%',
      value: '100'
    },
    opacity: {
      intensity: '',
      unit: '%',
      value: '100'
    },
    saturate: {
      intensity: '',
      unit: '%',
      value: '100'
    },
    sepia: {
      intensity: '',
      unit: '%',
      value: '100'
    },
  },
  getFilterPropValue: function() {
    const display = document.querySelector(this.imageContainer);
    return display.style.getPropertyValue('--filter-type');
  },
  removeFilter: function removeFilter(event) {
    const display = document.querySelector(this.imageContainer);
    const filterType = event.currentTarget.dataset.filter;
    /**
     * remove selected filter from filter value string
     */
    //str.replace(/xmas/i, 'Christmas')
    const _modifiedVal = this.getFilterPropValue().replaceAll(`${filterType}`, '');
    // update filter var with new value
    display.style.setProperty(`--filter-type`, _modifiedVal);
  },
  applyFilter: function applyFilter(event) {
    const display = document.querySelector(this.imageContainer);
    event.stopPropagation();
    event.stopImmediatePropagation();
    const newFilterType = event.currentTarget.dataset.filter;
    const _newVal = `${this.getFilterPropValue()} ${newFilterType}`;
    // update filter var with new value
    display.style.setProperty(`--filter-type`, _newVal);
  }
};

/**
 * When a filter icon is clicked:
 * - if the filter is not active, add an 'active' class
 * - add filter name to activeFilters array
 * - 
 */

let FilterCards = {
  containerId: "FilterIcons",
  generateFilterCard: function() {
    const filtersArr = Object.keys(ImageFilters.filterOptions);
    filtersArr.forEach((keyName) => {
      const filterData = ImageFilters.filterOptions[keyName];
      const filterStr = `${keyName}(${filterData.value}${filterData.unit})`;
      $(`#${this.containerId}`).append(
        `<div class="card">
            <div data-filter="${filterStr}" class="card-image">
              <img style="filter: ${filterStr}" src="images/filter_sample_img.jpg"/>
            </div>
            <span class="card-title">${keyName}</span>
          </div>`
      );
    });
  }
};

/**
 * Attach event handlers
 */
FilterCards.generateFilterCard();
$(".card-image").on("click", function(event) {
  if ($(event.currentTarget.parentElement).hasClass("active")) {
    $(event.currentTarget.parentElement).removeClass("active")
    ImageFilters.removeFilter(event);
    return;
  }
  /* add active class to icon and apply filter to image */
  $(event.currentTarget.parentElement).addClass("active");
  ImageFilters.applyFilter(event);
});

 /**
  * 
  * DELETE THIS:
  *        <div class="col s3 m1">
            <div class="card">
              <div data-filter="brightness(0.4)" class="card-image">
                <img src="images/filter_sample_img.jpg">
              </div>
              <span class="card-title">Brightness</span>
            </div>
          </div>
          <div class="col s3 m1">
            <div class="card">
              <div data-filter="grayscale(50%)" class="card-image">
                <img src="images/filter_sample_img.jpg">
              </div>
              <span class="card-title">Grayscale</span>
            </div>
          </div>
          <div class="col s3 m1">
            <div class="card">
              <div data-filter="invert(75%)" class="card-image">
                <img src="images/filter_sample_img.jpg">
              </div>
              <span class="card-title">Invert</span>
            </div>
          </div>
  * 
  */