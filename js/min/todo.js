var Todo=function(){this.inputSelector="#form input[type=text]",this.buttonSelector="#form button",this.taskZoneSelector="#taskZone",this.taskClass="task"};Todo.prototype={init:function(){this.handleButton()},handleButton:function(){$(this.buttonSelector).click(function(a){a.preventDefault();var b=$(this.inputSelector),c=b.val();if(""!=c){var d=$("<li></li>");d.addClass(this.taskClass),d.append(c);var e=$("<span></span>");this.handleDelButton(e),d.append(e),$(this.taskZoneSelector).prepend(d),this.animateTask(d,"in"),b.val("")}}.bind(this))},handleDelButton:function(a){a.click(function(){$parent=a.parent(),confirm("Supprimer la tâche ?")&&this.animateTask($parent,"out")}.bind(this))},animateTask:function(a,b){"in"==b?(a.fadeIn(),a.animate({left:0},500)):"out"==b&&(a.animate({left:-20},500),$(this).fadeOut(function(){a.remove()}))}};