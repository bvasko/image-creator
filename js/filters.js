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
  lsFilters: {},
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
    display.style.setProperty(`--filter-type`, updated);
    // update filter var with new value
    // display.style.setProperty(`--filter-type`, _newFilter);
  },
  saveFilter: function() {
    const savedFilters = JSON.parse(localStorage.getItem('myFilters')) || {};
    const name = $('#filter_name_input').val();
    const f = {[name]: ImageFilters.filterSettings};
    const newLS = {...savedFilters, ...f};
    localStorage.setItem('myFilters', JSON.stringify(newLS));
  },
  showFilter: function() {
    const myFilters = JSON.parse(localStorage.getItem("myFilters"));
    const names = Object.keys(myFilters);
    this.lsFilters = myFilters;
    let filterOpts = '';
    names.forEach(name => {
      filterOpts += `<li>${name}</li>`
    });
    $("#filter-menu .save-btn").append(`<div id='savedFilterMenu' class='savedFilters'><ul id='myFilter'>${filterOpts}</ul></div>`);
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
      const step = (keyName === 'brightness' || 'blur') ? .1 : 1;
      $(`#${this.containerId}`).append(
        `<li class="filter-setting">
            <span class="card-title">${keyName}</span>
            <p class="range-field">
            <input data-filter="${filterStr}" step="${step}" class="filterInput" type="range" id="${rangeId}" min="${filterData.min}" max="${filterData.max}" />
            </p>
        </li>`
      );
    });
  }
};


$('.dropdown-trigger').dropdown();
/** Generate filter icons */
FilterCards.generateFilterCard();
/**
 * Attach event handlers
 */

 $(document).on('input', '.filterInput', function(event) {
   ImageFilters.applyFilter(event);
});
$(document).on('click', '#myFilter', function(e){
  const f = ImageFilters.lsFilters[e.target.innerText];
  ImageFilters.filterSettings = f;
  // ImageFilters.applyFilter();

})
$("#saveFilterForm").on('click', function(e) {
  ImageFilters.saveFilter();
});
$("#saveFilterModal").modal({});
$("#noFiltersMsg").modal({});

$("#showSavedFilters").on("click", function(e) {
  if ($("#savedFilterMenu").css("display") === "block") {
    $("#savedFilterMenu").remove();
  } else {
    const filters = JSON.parse(localStorage.getItem("myFilters"));
    if (!filters) {
      $('#noFiltersMsg').modal('open');
      return;
    } else {
      
      ImageFilters.showFilter();
      $("#savedFilterMenu").css("display", "block");
    }

  }
});