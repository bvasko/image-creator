/**
 * TODO:
 * Display default value next to select box
 * adjust min max based on unit type
 * update image filter with value from slider
 */
let ImageFilters = {
  filterSelect: '#filterNameSelect',
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
  updateSelectBox: function(filterName, addOption) {
    if (addOption) {
      $(this.filterSelect).append(`<option value="${filterName}">${filterName}</option>`);
    }
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
    const _modifiedVal = this.getFilterPropValue().replaceAll(`${filterType}`, '');
    // update filter var with new value
    display.style.setProperty(`--filter-type`, _modifiedVal);
  },
  updateFilterIntensity: function updateFilterIntensity(val) {
    // get selected value from filterValRange
    console.log($(this.filterSelect).val());
    const filterName = $(this.filterSelect).val();
    const _oldPropArr = this.getFilterPropValue().split(" ");
    console.log('_old ', _oldPropArr);
    const _newArr = _oldPropArr.map((prop, i, arr) => {
      if (prop.includes(filterName)) {
        let unit = this.filterOptions[filterName].unit;
        return `${filterName}(${val}${unit})`;
      }
      return prop;
    });
  
    const newFilterValue = _newArr.join(' ');
    console.log('_new ', newFilterValue);
    /**
     * Need to get current filter string, which could have multiple props + values
     * find the current filter and value
     * update the value
     * re-apply the new filter prop
     */
     const display = document.querySelector(this.imageContainer);
    display.style.setProperty(`--filter-type`, newFilterValue);
  },
  applyFilter: function applyFilter(event) {
    const display = document.querySelector(this.imageContainer);
    event.stopPropagation();
    event.stopImmediatePropagation();
    const newFilterType = event.currentTarget.dataset.filter;
    const filterName = newFilterType.split('(');
    this.updateSelectBox(filterName[0], true);
    const _newVal = `${this.getFilterPropValue()} ${newFilterType}`;
    // update filter var with new value
    display.style.setProperty(`--filter-type`, _newVal);
  }
};


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

/** Generate filter icons */
FilterCards.generateFilterCard();
/**
 * Attach event handlers
 */
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

$(document).on('change', '#intensityVal', function() {
  $('#displayIntensity').html( $(this).val() );
  ImageFilters.updateFilterIntensity($(this).val());
});