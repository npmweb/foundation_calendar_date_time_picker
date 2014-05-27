var FCalendar=function(a,e){this.opts=$.extend({},{selected:null,visible:new Date,valueFormat:"YYYY-MM-DD HH:mm:ss",dateFormat:"MMMM D, YYYY",timeFormat:"HH:mm:ss",dateChange:null},e),this.field=$(a),this.vDate=null,this.sDate=null;var t=this.field.val()&&this.field.val().length>0?this.field.val():this.opts.selected;this.selected(t);var i=this.field.val()&&this.field.val().length>0?this.field.val():this.opts.visible;this.visible(i),this.field.data("calendar",this),this.field.change(function(){var a=$(this),e=a.data("calendar");e.selected(a.val(),!0)})};FCalendar.prototype={selected:function(a,e){return a&&(this.trigger("beforeSelectedDateChange",[a,e]),this.sDate=moment(a),e||this.field.val(this.sDate.format(this.opts.valueFormat)),this.saveState(),this.trigger("selectedDateChange",[a,e])),this.sDate?this.sDate:null},visible:function(a){return a&&(this.trigger("beforeVisibleDateChange",[a]),this.vDate=moment(a),this.vDate.date(1),this.saveState(),this.trigger("visibleDateChange",[a])),this.vDate?this.vDate:null},firstVisibleDay:function(){var a=moment(this.visible());return a.subtract("d",a.day())},lastVisibleDay:function(){var a=moment(this.visible()),e=a.date(a.daysInMonth());return e.add("d",7-e.day())},saveState:function(){this.trigger("beforeSaveState"),this.field.data("calender",this),this.trigger("saveState")},moveMonth:function(a){this.trigger("beforeMoveMonth",[a]),this.vDate.add("M",a),this.vDate.date(1),this.saveState(),this.trigger("moveMonth",[a])},moveYear:function(a){this.trigger("beforeMoveYear",[a]),this.vDate.add("y",a),this.vDate.date(1),this.saveState(),this.trigger("moveYear",[a])},moveTo:function(a){this.trigger("beforeMoveTo",[a]),this.vDate=moment(a).date(1),this.saveState(),this.trigger("moveTo",[a])},moveToMonth:function(a){this.trigger("beforeMoveToMonth",[a]),this.vDate.month(a),this.vDate.date(1),this.saveState(),this.trigger("moveToMonth",[a])},moveToYear:function(a){this.trigger("beforeMoveToYear",[a]),this.vDate.year(a),this.vDate.date(1),this.saveState(),this.trigger("moveToYear",[a])},toString:function(a){return this.sDate?a&&"d"==a[0].toLowerCase()?this.sDate.format(this.opts.dateFormat):a&&"t"==a[0].toLowerCase()?this.sDate.format(this.opts.timeFormat):this.sDate.format(this.opts.dateFormat)+" "+this.sDate.format(this.opts.timeFormat):"--"},trigger:function(a,e){this.field.trigger(a,[this,this.opts].concat(e))}},$.fn.fcdp=function(a,e,t){var i=$.type(a);"object"==i?$(this).each(function(){$.fcdp.buildUI($(this),a)}):"string"==i&&$(this).each(function(){$.fcdp.execute($(this),a,e,t)})},$.fcdp={init:function(){$("input[data-date-time]").add($("input[data-date]")).add($("input[data-time]")).each(function(){var a=$(this);$.fcdp.buildUI(a),$.fcdp.wireupInput(a);var e=a.data("opts");a.trigger("selectedDateChange",[e.calendar,e.calendar.opts])}),$(document).click(function(a){$(".calendar").not(".fixed").find(".date-picker").hide(),$(".calendar").find(".time-picker").hide()})},wireupInput:function(a){a.bind("moveMonth",function(a,e,t,i){var n=$(this).data("opts");$.fcdp.buildCalendar(n)}),a.bind("selectedDateChange",function(a,e,t,i){var n=$(this).data("opts");n.hasDatePicker&&n.dom.dateSelector.find(".value").html(e.toString("d")),n.hasTimePicker&&n.dom.timeSelector.find(".value").html(e.toString("t"))})},buildUI:function(a,e){var t=new FCalendar(a,{dateFormat:a.is("[data-date-format]")?a.data("date-format"):"MMMM D, YYYY",timeFormat:a.is("[data-time-format]")?a.data("time-format"):"h:mm:ss a",valueFormat:a.is("[data-value-format]")?a.data("value-format"):"YYYY-MM-DD HH:mm:ss"});a.wrap('<div class="calendar"></div>'),a.wrap('<div class="hidden"></div>'),a.addClass("value");var i=a.closest(".calendar"),n=$('<div class="selector"></div>');i.append(n);var s=a.is("[data-time]")||a.is("[data-date-time]")?!0:!1,d=a.is("[data-date]")||a.is("[data-date-time]")?!0:!s,l={input:a,calendar:t,hasTimePicker:s,hasDatePicker:d,nullable:a.is("[data-nullable]"),minDate:a.is("[data-min-date]")?this.getDateFromString(a.data("min-date")):null,maxDate:a.is("[data-max-date]")?this.getDateFromString(a.data("max-date")):null,fixed:a.is("[data-fixed]")?!0:!1,dom:{calendar:i,dateSelector:null,datePicker:null,timeSelector:null,timePicker:null,clearButton:null}};if(e=$.extend({},l,e),e.fixed&&i.addClass("fixed"),e.hasDatePicker){if(!e.fixed){var o=$('<a class="date-selector"></a>');o.append('<i class="fi-calendar"></i><span class="value"></span>'),n.append(o),n.addClass("date")}var r=$('<div class="date-picker"></div>');i.append(r),r.click(function(a){a.stopPropagation()})}if(e.hasTimePicker&&!e.fixed){var c=$('<a class="time-selector"></a>');c.append('<i class="fi-clock"></i><span class="value"></span>'),n.append(c),n.addClass("time");var p=$('<div class="time-picker"></div>');i.append(p),p.click(function(a){a.stopPropagation()})}if(e.nullable){var u=$('<a class="clear"><i class="fi-x"></i></a>');n.append(u)}n.click(function(a){a.stopPropagation()}),e.dom.dateSelector=d?i.find(".date-selector"):null,e.dom.datePicker=d?i.find(".date-picker"):null,e.dom.timeSelector=s?n.find(".time-selector"):null,e.dom.timePicker=s?i.find(".time-picker"):null,e.dom.clearButton=e.nullable?i.find("a.clear"):null,i.data("opts",e),a.data("opts",e),e.dom.dateSelector&&e.dom.dateSelector.click(function(a){a.preventDefault();var e=$(this).closest(".calendar"),t=e.find(".time-picker"),i=e.find(".date-picker"),n=e.find(".date-selector");i.css({top:n.position().top+n.outerHeight(),left:n.position().left}),t.hide(),i.toggle()}),e.dom.timeSelector&&i.find("a.time-selector").click(function(a){a.preventDefault();var e=$(this).closest(".calendar"),t=e.find(".date-picker"),i=e.find(".time-picker"),n=e.find(".time-selector");i.css({top:n.position().top+n.outerHeight(),right:n.position().right}),t.hide(),i.toggle()}),e.dom.clearButton&&e.dom.clearButton.click(function(a){a.preventDefault();var e=$(this).closest(".calendar").data("opts");e.dom.datePicker.add(e.dom.timePicker).hide(),$.fcdp.setFieldDate(e,null)}),this.buildCalendar(e),this.buildTime(e),this.updateTimePicker(e)},buildTime:function(a){if(tp=a.dom.timePicker){var e=$('<div class="header"></div>'),t=$('<div class="time">Time</div>');e.append(t),tp.append(e);var i=$('<div class="time"></div>'),n=$('<div class="value-control hour"><label>Hr</label><a class="value-change up"><span></span></a><input type="text" class="display" value="12" /><a class="value-change down"><span></span></a></div>'),s=$('<div class="value-control minute"><label>Min</label><a class="value-change up"><span></span></a><input type="text" class="display" value="00" /><a class="value-change down"><span></span></a></div>'),d=$('<div class="value-control second"><label>Sec</label><a class="value-change up"><span></span></a><input type="text" class="display" value="00" /><a class="value-change down"><span></span></a></div>'),l=$('<div class="value-control ampm"><label>A/P</label><a class="value-change up"><span></span></a><input type="text" class="display" value="AM" /><a class="value-change down"><span></span></a></div>');i.append(n),i.append(s),i.append(d),i.append(l),tp.append(i),this.wireupTime(a)}},wireupTime:function(a){if(tp=a.dom.timePicker){var e=tp.find(".value-control.hour");this.wireupTimeValueControl(e,1,12,1);var t=tp.find(".value-control.minute");this.wireupTimeValueControl(t,0,59,2);var i=tp.find(".value-control.second");this.wireupTimeValueControl(i,0,59,2);var n=tp.find(".value-control.ampm");this.wireupTimeAmPmControl(n)}},wireupTimeAmPmControl:function(a){a.find(".value-change").click(function(a){a.preventDefault();var e=$(this),t=e.closest(".value-control"),i=t.find("input.display").val().toLowerCase();i="am"==i?"PM":"AM",t.find("input.display").val(i),$.fcdp.updateTime(e.closest(".calendar").data("opts"))}),a.find("input.display").change(function(a){var e=$(this),t=e.closest(".value-control"),i=t.find("input.display").val().toLowerCase()[0];i="p"==i?"PM":"AM",t.find("input.display").val(i),$.fcdp.updateTime(e.closest(".calendar").data("opts"))})},wireupTimeValueControl:function(a,e,t,i){a.data("opts",{max:t,min:e,pad:i}),a.find(".value-change.up").click(function(a){a.preventDefault();var e=$(this),t=e.closest(".value-control"),i=t.data("opts"),n=parseInt(t.find("input.display").val());n+=1,n=n>i.max?i.min:n,t.find("input.display").val(10>n?"0"+n:n);var s=e.closest(".calendar").data("opts");$.fcdp.updateTime(s)}),a.find(".value-change.down").click(function(a){a.preventDefault();var e=$(this),t=e.closest(".value-control"),i=t.data("opts"),n=parseInt(t.find("input.display").val());n-=1,n=n<i.min?i.max:n,t.find("input.display").val(10>n?"0"+n:n);var s=e.closest(".calendar").data("opts");$.fcdp.updateTime(s)}),a.find("input.display").change(function(a){var e=$(this),t=e.closest(".value-control"),i=t.data("opts"),n=parseInt(t.find("input.display").val());n=isNaN(n)?i.min:n>i.max?i.max:n<i.min?i.min:n,t.find("input.display").val(10>n?"0"+n:n);var s=e.closest(".calendar").data("opts");$.fcdp.updateTime(s)})},updateTimePicker:function(a){var e;if(e=a.dom.timePicker){var t=a.calendar.selected();t&&(e.find(".value-control.hour").find("input.display").val(t.format("HH")),e.find(".value-control.minute").find("input.display").val(t.format("mm")),e.find(".value-control.second").find("input.display").val(t.format("ss")),e.find(".value-control.ampm").find("input.display").val(t.format("A")))}},updateTime:function(a){var e;if(e=a.dom.timePicker){var t=e.find(".value-control.hour").find("input.display").val();t=t?parseInt(t):0;var i=e.find(".value-control.minute").find("input.display").val();i=i?parseInt(i):0;var n=parseInt(e.find(".value-control.second").find("input.display").val());n=n?parseInt(n):0;var s=e.find(".value-control.ampm").find("input.display").val();t=12==t?0:t,"pm"===s.toLowerCase()&&(t+=12),t%=24;var d=a.calendar.selected();d.hour(t).minute(i).second(n),a.calendar.selected(d)}},buildCalendar:function(a){var e=a.dom.datePicker;if(e){e.empty();var t=a.calendar,i=moment(t.visible()),n=moment(t.selected()),s=$('<div class="week"></div>'),d=$('<div class="header"></div>');d.append('<a href="#" class="month-nav prev"><i class="fi-arrow-left"></i></a>'),d.append('<a href="#" class="month-nav next"><i class="fi-arrow-right"></i></a>'),d.append('<div class="month">'+i.format("MMMM YYYY")+"</div>"),e.append(d);var l=$('<div class="weeks"></div>'),o=$('<div class="week labels"></div>'),r=["Su","Mo","Tu","We","Th","Fr","Sa"];for(c=0;7>c;c++)o.append('<div class="day">'+r[c]+"</div>");l.append(o);for(var c=0,p=i.month(),u=t.firstVisibleDay(),v=t.lastVisibleDay(),h=moment();u.isBefore(v);){for(c=0;7>c;c++){var m={date:u,is_current_month:u.month()==p,is_weekend:u.isoWeekday()>=6,is_today:u.month()==h.month()&&u.date()==h.date()&&u.year()==h.year(),is_selected:u.isSame(n)};s.append(this.buildDayUI(a,m)),u=u.add("d",1),currentMonth=u.month(),currentYear=u.year()}l.append(s),s=$('<div class="week"></div>')}e.append(l),this.wireupCalendar(a,i)}},buildDayUI:function(a,e){e.is_clickable=this.dateIsClickable(a,e);var t=this.executeBehavior("buildDayUI",a,e);if(!t){var i=e.date.date(),n="day"+(e.is_current_month?"":" other-month")+(e.is_weekend?" weekend":"")+(e.is_selected?" selected":"")+(e.is_today?" today":"");t=e.is_current_month?e.is_clickable?'<a href="#'+i+'" class="'+n+'" data-date="'+e.date.format()+'">'+i+"</a>":'<span class="'+n+'" data-date="'+e.date.format()+'">'+i+"</span>":'<div class="'+n+'">'+i+"</div>"}return t},dateIsClickable:function(a,e){if(a.minDate&&e.date<a.minDate||a.maxDate&&e.date>a.maxDate)return!1;var t=this.executeBehavior("dateIsClickable",a,e);return t=null===t?!0:t},wireupCalendar:function(a,e){console.info("wireupCalendar");var t=a.dom.datePicker;t&&(t.find("a.month-nav.prev").unbind("click").click(function(a){a.preventDefault(),console.info("Previous Month");var e=$(this).closest(".calendar").data("opts");e.calendar.moveMonth(-1)}),t.find("a.month-nav.next").unbind("click").click(function(a){a.preventDefault(),console.info("Next Month");var e=$(this).closest(".calendar").data("opts");e.calendar.moveMonth(1)}),t.find("a.day").click(function(a){var e=$(this),t=e.closest(".calendar").data("opts"),i=t.dom.datePicker;i.find("a.selected").removeClass("selected"),e.addClass("selected");var n=t.calendar.selected(e.attr("data-date"));i.hide()}))},execute:function(a,e,t,i){switch(e){case"bindBehavior":this.bindBehavior(a,t,i)}},bindBehavior:function(a,e,t){if($.isFunction(t)){var i=a.data("behaviors");i=i||{},i[e]=i[e]||[],i[e].push(t),a.data("behaviors",i)}},executeBehavior:function(a,e,t){var i=null,n=e.input.data("behaviors");return n&&n[a]&&$.each(n[a],function(){$.isFunction(this)&&(i=this(e,t,i))}),i}},$(document).ready(function(){$.fcdp.init()});