(function(){var e,t,r,o,a;t="newtheatre",e="history-project",$(document).ready(function(){return $(".fancybox").fancybox()}),Mousetrap.bind("left",function(){return"jekyll_page_previous"in window?window.location.href=jekyll_page_previous:void 0}),Mousetrap.bind("right",function(){return"jekyll_page_next"in window?window.location.href=jekyll_page_next:void 0}),Mousetrap.bind("e d i t o r",function(){return"yes"===localStorage.debug_mode?(localStorage.debug_mode="no",$("[data-debug-toggle]").hide()):(localStorage.debug_mode="yes",$("[data-debug-toggle]").show())}),$(document).ready(function(){return"yes"===localStorage.debug_mode?$("[data-debug-toggle]").show():void 0}),$(document).ready(function(){return $("#report-this-page").click(function(e){return e.preventDefault(),$("#report").addClass("report-show")}),$("[data-report-close]").click(function(e){return e.preventDefault(),$("#report").removeClass("report-show")}),$("#improve-this-page").click(function(e){return"yes"!==localStorage.debug_mode?(e.preventDefault(),$("#improve").addClass("report-show")):void 0}),$("[data-improve-close]").click(function(e){return e.preventDefault(),$("#improve").removeClass("report-show")}),$("[data-report-this-page]").click(function(e){return e.preventDefault(),$("#improve").removeClass("report-show"),$("#report").addClass("report-show")})}),$("#report-issue-form").submit(function(e){var t,n;return e.preventDefault(),n=$(this).serializeArray(),t=$(this).attr("action"),$.ajax({url:t,type:"POST",data:n,success:function(e){return"success"===e.status?a(e.url):(alert("There was a problem with the data your provided"),o())},error:function(){return alert("Oops, something went wrong"),o()}}),r()}),r=function(){return $(".report-submit").attr("disabled",!0),$(".report-submit").addClass("disabled"),$(".report-submit").html('<i class="fa fa-circle-o-notch fa-spin"></i>')},o=function(){return $(".report-submit").attr("disabled",!1),$(".report-submit").removeClass("disabled"),$(".report-submit").html("Try Again")},a=function(e){var t;return t=_.template($("#report-success-template").html()),$("#report-modal-content").html(t({url:e}))}}).call(this);