(function() {
  var INDEX_URL, PEOPLE_FEED, RENDER_TO, REVERSE_INDEX_URL, SearchResultView, TEMPLATE_DATA, TEMPLATE_EMPTY, TEMPLATE_RESULT, collectPersonFormSetup, configureWindow, delay, disableForm, doSearch, enableForm, index, indexReady, loadIndex, posterwallImageBodge, reportThanks, reverse_index;

  window.GITHUB_ISSUES_USER = "newtheatre";

  window.GITHUB_ISSUES_REPO = "history-project";

  window.getUrlParameter = function(name) {
    var match;
    match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  window.debounce = function(fn) {
    var timeout;
    timeout = void 0;
    return function() {
      var args, ctx;
      args = Array.prototype.slice.call(arguments);
      ctx = this;
      clearTimeout(timeout);
      return timeout = setTimeout((function() {
        fn.apply(ctx, args);
      }), 40);
    };
  };

  $(document).ready(function() {
    return $('.fancybox').fancybox();
  });

  Mousetrap.bind('left', function() {
    if ('jekyll_page_previous' in window) {
      return window.location.href = jekyll_page_previous;
    }
  });

  Mousetrap.bind('right', function() {
    if ('jekyll_page_next' in window) {
      return window.location.href = jekyll_page_next;
    }
  });

  Mousetrap.bind('e d i t o r', function() {
    if (localStorage.debug_mode === "yes") {
      localStorage.debug_mode = "no";
      return $('[data-debug-toggle]').hide();
    } else {
      localStorage.debug_mode = "yes";
      return $('[data-debug-toggle]').show();
    }
  });

  $(document).ready(function() {
    if (localStorage.debug_mode === "yes") {
      return $('[data-debug-toggle]').show();
    }
  });

  $(document).ready(function() {
    $('#report-this-page').click(function(e) {
      e.preventDefault();
      return $('#report').addClass('report-show');
    });
    $('[data-report-close]').click(function(e) {
      e.preventDefault();
      return $('#report').removeClass('report-show');
    });
    $('#improve-this-page').click(function(e) {
      if (localStorage.debug_mode !== "yes") {
        e.preventDefault();
        return $('#improve').addClass('report-show');
      }
    });
    $('[data-improve-close]').click(function(e) {
      e.preventDefault();
      return $('#improve').removeClass('report-show');
    });
    return $('[data-report-this-page]').click(function(e) {
      e.preventDefault();
      $('#improve').removeClass('report-show');
      return $('#report').addClass('report-show');
    });
  });

  $("#report-issue-form").submit(function(e) {
    var formURL, postData;
    e.preventDefault();
    postData = $(this).serializeArray();
    formURL = $(this).attr('action');
    $.ajax({
      url: formURL,
      type: "POST",
      data: postData,
      success: function(data, textStatus, jqXHR) {
        if (data.status === "success") {
          return reportThanks(data.url);
        } else {
          alert('There was a problem with the data your provided');
          return enableForm();
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Oops, something went wrong');
        return enableForm();
      }
    });
    return disableForm();
  });

  disableForm = function() {
    $('.report-submit').attr("disabled", true);
    $('.report-submit').addClass('disabled');
    return $('.report-submit').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
  };

  enableForm = function() {
    $('.report-submit').attr("disabled", false);
    $('.report-submit').removeClass('disabled');
    return $('.report-submit').html('Try Again');
  };

  reportThanks = function(url) {
    var template;
    template = _.template($('#report-success-template').html());
    return $('#report-modal-content').html(template({
      'url': url
    }));
  };

  $("#collect-show-form").submit(function(e) {
    var formURL, form_data, form_dict, message, postData;
    e.preventDefault();
    form_data = $(this).serializeArray();
    form_dict = {};
    form_data.forEach(function(x) {
      return form_dict[x['name']] = x['value'];
    });
    message = "# 'Tell us about a show' form submission\n\nField | Data\n----- | ----\nTitle | " + form_dict['title'] + "\nPlaywright | " + form_dict['playwright'] + "\nDate Start | " + form_dict['date_start_day'] + " / " + form_dict['date_start_month'] + " / " + form_dict['date_start_year'] + "\nDate End | " + form_dict['date_end_day'] + " / " + form_dict['date_end_month'] + " / " + form_dict['date_end_year'] + "\nType | " + form_dict['type'] + "\nVenue | " + form_dict['venue'] + "\n\n## Synopsis\n\n" + form_dict['synopsis'] + "\n\n## Cast\n\n" + form_dict['cast'] + "\n\n## Crew\n\n" + form_dict['crew'] + "\n\n## Anything Else\n\n" + form_dict['other'] + "\n\n## Submitter\n\nField | Data\n----- | ----\nName | " + form_dict['name'] + "\nGraduated | " + form_dict['graduation'] + "\n\n## Attempted File Generation\n\n```\n---\ntitle: " + form_dict['title'] + "\nplaywright: " + form_dict['playwright'] + "\nseason: ??? (" + form_dict['type'] + ")\nseason_sort: ??\nperiod: ??\nvenue:\n  - " + form_dict['venue'] + "\ndate_start: " + form_dict['date_start_year'] + "-" + form_dict['date_start_month'] + "-" + form_dict['date_start_day'] + "\ndate_end: " + form_dict['date_end_year'] + "-" + form_dict['date_end_month'] + "-" + form_dict['date_end_day'] + "\n\ncast:\n  - role:\n    name:\n\ncrew:\n  - role: Director\n    name:\n  - role: Producer\n    name:\n\ncomment: Details from " + form_dict['name'] + " (" + form_dict['graduation'] + ")\npublished: true\n---\n\n" + form_dict['synopsis'] + "\n```";
    postData = {
      'title': form_dict['title'],
      'message': message,
      'name': '',
      'page_url': '/collect/show/'
    };
    formURL = $(this).attr('action');
    $.ajax({
      url: formURL,
      type: "POST",
      data: postData,
      success: function(data, textStatus, jqXHR) {
        if (data.status === "success") {
          return window.location.href = '/collect/show/thanks/';
        } else {
          alert('There was a problem with the data you provided');
          return enableForm();
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Oops, something went wrong');
        return enableForm();
      }
    });
    return disableForm();
  });

  $("#collect-person-form").submit(function(e) {
    var formURL, form_data, form_dict, message, postData;
    e.preventDefault();
    form_data = $(this).serializeArray();
    form_dict = {};
    form_data.forEach(function(x) {
      return form_dict[x['name']] = x['value'];
    });
    message = "# 'Submit an almni bio' form submission\n\nField | Data\n----- | ----\nName | " + form_dict['name'] + "\nGrad Year | " + form_dict['graduation'] + "\nCourse | " + form_dict['course'] + "\n\n## Bio1 (Time at theatre)\n\n" + form_dict['bio1'] + "\n\n## Bio2 (Post-graduation)\n\n" + form_dict['bio2'] + "\n\n## Links\n\n" + form_dict['links'] + "\n\n## Shows\n\n" + form_dict['shows'] + "\n\n## Committees\n\n" + form_dict['committees'] + "\n\n## Awards\n\n" + form_dict['awards'] + "\n\n## Attempted File Generation\n\n```\n---\ntitle: " + form_dict['name'] + "\ncourse:\n  - " + form_dict['course'] + "\ngraduated: " + form_dict['graduation'] + "\n---\n\n" + form_dict['bio1'] + "\n\n" + form_dict['bio2'] + "\n\n" + form_dict['links'] + "\n\n" + form_dict['awards'] + "\n```";
    postData = {
      'title': form_dict['name'] + " bio submission",
      'message': message,
      'name': '',
      'page_url': '/collect/person/'
    };
    formURL = $(this).attr('action');
    $.ajax({
      url: formURL,
      type: "POST",
      data: postData,
      success: function(data, textStatus, jqXHR) {
        if (data.status === "success") {
          return window.location.href = '/collect/person/thanks/';
        } else {
          alert('There was a problem with the data you provided');
          return enableForm();
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Oops, something went wrong');
        return enableForm();
      }
    });
    return disableForm();
  });

  PEOPLE_FEED = "/feeds/people.json";

  TEMPLATE_DATA = "#collect-template-list";

  collectPersonFormSetup = function() {
    var path;
    path = window.getUrlParameter('name');
    console.log(path);
    if (path.length > 0) {
      return $.get(PEOPLE_FEED, function(data) {
        var i, item, j, len, len1, ref, ref1, results1, template;
        if (path in data) {
          console.log(data[path].name);
          $('.collect-field-name').val(data[path].name);
          template = _.template($(TEMPLATE_DATA).html());
          ref = data[path].shows;
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            $("#collect-shows .collect-person-data").append(template({
              item: item
            }));
          }
          ref1 = data[path].committees;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            item = ref1[j];
            results1.push($("#collect-committees .collect-person-data").append(template({
              item: item
            })));
          }
          return results1;
        }
      }, 'json');
    }
  };

  disableForm = function() {
    $('.collect-submit').attr("disabled", true);
    $('.collect-submit').addClass('disabled');
    return $('.collect-submit').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
  };

  enableForm = function() {
    $('.collect-submit').attr("disabled", false);
    $('.collect-submit').removeClass('disabled');
    return $('.collect-submit').html('Try Again');
  };

  $(document).ready(function() {
    if ($('body').hasClass('collect-person-form')) {
      return collectPersonFormSetup();
    }
  });

  INDEX_URL = '/feeds/search_index.json';

  REVERSE_INDEX_URL = '/feeds/search_index_reverse.json';

  TEMPLATE_RESULT = '#search-result';

  TEMPLATE_EMPTY = '#search-message-empty';

  RENDER_TO = '[data-search-results]';

  indexReady = function() {
    return configureWindow();
  };

  configureWindow = function() {
    var sView, urlQ;
    sView = new SearchResultView;
    window.sView = sView;
    urlQ = window.getUrlParameter('q');
    if (urlQ !== null) {
      sView.search(urlQ);
      $('#q').val(urlQ);
    } else {
      sView.renderBlank();
    }
    return $('#q').keyup(debounce(function() {
      var query;
      if ($(this).val().length < 2) {
        return sView.renderBlank();
      }
      query = $(this).val();
      return sView.search(query);
    }));
  };

  index = new Object;

  reverse_index = new Object;

  loadIndex = function() {
    console.time('loadIndex');
    $.get(INDEX_URL, function(data) {
      index = lunr.Index.load(data);
      return $.get(REVERSE_INDEX_URL, function(data) {
        reverse_index = data;
        return indexReady();
      }, 'json');
    }, 'json');
    return console.timeEnd('loadIndex');
  };

  doSearch = function(query) {
    var lunr_results, results;
    lunr_results = index.search(query);
    results = new Array;
    lunr_results.forEach(function(item) {
      return results.push(reverse_index[item['ref']]);
    });
    return results;
  };

  window.doSearch = doSearch;

  SearchResultView = (function() {
    function SearchResultView() {}

    SearchResultView.prototype.getSingleTemplate = function() {
      return _.template($(TEMPLATE_RESULT).html());
    };

    SearchResultView.prototype.search = function(query) {
      this.query = query;
      return this.render();
    };

    SearchResultView.prototype.render = function() {
      var results;
      results = doSearch(this.query);
      if (results.length > 0) {
        return this.renderResults(results);
      } else {
        return this.renderEmpty();
      }
    };

    SearchResultView.prototype.renderResults = function(results) {
      var results_html, singleTemplate;
      singleTemplate = this.getSingleTemplate();
      results_html = [];
      results.forEach(function(result) {
        return results_html.push(singleTemplate({
          item: result
        }));
      });
      return $(RENDER_TO).html(results_html);
    };

    SearchResultView.prototype.renderEmpty = function() {
      var html, template;
      template = _.template($(TEMPLATE_EMPTY).html());
      html = template({
        query: this.query
      });
      return $(RENDER_TO).html(html);
    };

    SearchResultView.prototype.renderBlank = function() {
      return $(RENDER_TO).html('<!-- BLANK -->');
    };

    return SearchResultView;

  })();

  $(document).ready(function() {
    if ($('body').hasClass('search')) {
      return loadIndex();
    }
  });

  $(document).ready(function() {
    return $('.js-lettering').lettering();
  });

  delay = function(ms, func) {
    return setTimeout(func, ms);
  };

  posterwallImageBodge = function() {
    return $('.posterwall-poster img').each(function() {
      var h;
      h = $(this).parent().height();
      return $(this).height(h);
    });
  };

  $(document).load(function() {
    return posterwallImageBodge();
  });

}).call(this);
