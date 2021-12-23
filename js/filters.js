let filterIcons = $(".card-image");
let ImageFilters = {
  filterOptions: {
    blur: {
      intensity: '',
      unit: 'px',
      value: '3'
    },
    brightness: {
      intensity: '',
      unit: '%',
      value: '100'
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
      unit: ' ',
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
  getActiveFilters: function() {
    //return a list of elements that are active
    return $('.filterIcons .active');
  },
  getActiveFilterstype: function() {
    /**
     * loop through active filters
     */
    let filterStr = '';
    return filterStr;
  },
  applyFilter: function applyFilter(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    const filterType = event.currentTarget.dataset.filter;
    display = document.querySelector('#image-container');
    // update filter var with new value
    display.style.setProperty(`--background-image-url`, backgroundUrl);
    display.style.setProperty(`--filter-type`, filterType);
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
    console.log(filtersArr);
    filtersArr.forEach((keyName) => {
      const filterData = ImageFilters.filterOptions[keyName];
      $(`#${this.containerId}`).append(
        `<div class="col s4 m3">
          <div class="card">
            <div data-filter="${keyName}(${filterData.value}${filterData.unit})" class="card-image">
              <img style="filter: ${keyName}(${filterData.value}${filterData.unit})" src="images/filter_sample_img.jpg"/>
            </div>
            <span class="card-title">${keyName}</span>
          </div>
        </div>`
      );
    });
  }
};

/**
 * Attach event handlers
 */
FilterCards.generateFilterCard();
filterIcons.on("click", ImageFilters.applyFilter);

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