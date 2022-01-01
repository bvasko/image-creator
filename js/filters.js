
let ImageFilters = {
  imageContainer: '#image-container',
  filterOptions: {
    blur: {
      intensity: '',
      unit: 'px',
      value: '3',
      min: 0,
      max: 10
    },
    brightness: {
      intensity: '',
      unit: '',
      value: '3',
      min: 0,
      max: 100
    },
    contrast: {
      intensity: '',
      unit: '%',
      value: '100',
      min: 0,
      max: 200
    },
    grayscale: {
      intensity: '',
      unit: '%',
      value: '100',
      min: 0,
      max: 100
    },
    'hue-rotate': {
      intensity: '',
      unit: 'deg',
      value: '100',
      min: 0,
      max: 100
    },
    invert: {
      intensity: '',
      unit: '%',
      value: '100',
      min: 0,
      max: 100
    },
    opacity: {
      intensity: '',
      unit: '%',
      value: '100',
      min: 0,
      max: 100
    },
    saturate: {
      intensity: '',
      unit: '%',
      value: '100',
      min: 0,
      max: 200
    },
    sepia: {
      intensity: '',
      unit: '%',
      value: '100',
      min: 0,
      max: 100
    },
  },
  filterSettings: {},
  removeFilter: function removeFilter(event) {
    const display = document.querySelector(this.imageContainer);
    const filterType = event.currentTarget.dataset.filter;
    /**
     * remove selected filter from filter value string
     */
    const _modifiedVal = this.getFilterPropValue().replaceAll(`${filterType}`, '');
    // update filter var with new value
    display.style.setProperty(`--filter-type`, _modifiedVal);
  },
  updateFilterPropsValue: function(display, filterName, newFilter) {
    const imageFilter = display.style.getPropertyValue('--filter-type');
    if (!imageFilter) return newFilter;
    //if there is a current filter setting, update the setting
    this.filterSettings[filterName] = newFilter;
    let filterStr = '';
    Object.keys(this.filterSettings).forEach(key => {
      const str = this.filterSettings[key];
      filterStr = filterStr + " " + str;
    });
    // create a string of the filter values
    return filterStr;
  },
  applyFilter: function applyFilter(event) {
    // on change apply filter to image
    // get image element
    const display = document.querySelector(this.imageContainer);
    const filterName = event.target.dataset.filter;
    const filterData = this.filterOptions[filterName];
    event.stopPropagation();
    event.stopImmediatePropagation();
    let val;
    if (filterName === 'brightness') {
      val = event.currentTarget.value * .1;
    } else {
      val = event.currentTarget.value;
    }
    const filterPropStr = `${filterName}(${val}${filterData.unit})`;
    const updated = this.updateFilterPropsValue(display, filterName, filterPropStr)
    console.log('new filterPropStr', updated);
    display.style.setProperty(`--filter-type`, updated);
    // update filter var with new value
    // display.style.setProperty(`--filter-type`, _newFilter);
  }
};


let FilterCards = {
  containerId: "FilterIcons",
  generateFilterCard: function() {
    const filtersArr = Object.keys(ImageFilters.filterOptions);
    filtersArr.forEach((keyName) => {
      const filterData = ImageFilters.filterOptions[keyName];
      const filterStr = `${keyName}`;
      const rangeId = `${keyName}`;
      $(`#${this.containerId}`).append(
        `<li class="filter-setting">
            <span class="card-title">${keyName}</span>
            <p class="range-field">
            <input data-filter="${filterStr}" class="filterInput" type="range" id="${rangeId}" min="${filterData.min}" max="${filterData.max}" />
            </p>
        </li>`
      );
    });
  }
};

/** Generate filter icons */
FilterCards.generateFilterCard();
/**
 * Attach event handlers
 */

 $(document).on('input', '.filterInput', function(event) {
   ImageFilters.applyFilter(event);
});
