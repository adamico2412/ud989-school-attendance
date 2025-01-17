$(function(){
    var model = {
        students: [
                    {
                        name: "Slappy the Frog",
                        absences: 0
                    },
                    {
                        name: "Lilly the Lizard",
                        absences: 0
                    }, 
                    {
                        name: "Paulrus the Walrus",
                        absences: 0
                    },
                    {
                        name: "Gregory the Goat",
                        absences: 0
                    },
                    {
                        name: "Adam the Anaconda",
                        absences: 0
                    }
                ],
        timeInterval: 12
    };
    
    var octopus = {
        incrementAbsences: function(studentName) {
            var students = this.getStudents();
            
            for (var i = 0; i < students.length; ++i) {
                if (students[i].name === studentName) {
                    ++students[i].absences;
                    break;
                }
            }
            
        },
        
        getStudents: function() {
            return model.students;
        },
        
        getTimeInterval: function() {
            return model.timeInterval;
        },
        
        init: function() {
            view.init();
        }
    };
    
    var view = {
        init: function() {
            this.numCols = octopus.getTimeInterval();
            this.headerRow = $("thead tr");
            this.tableBody = $("tbody");
            this.render();
            this.$allCheckboxes = $("tbody input");
            this.$allMissed = $('tbody .missed-col');
            
            this.$allCheckboxes.on('click', function() {
                var studentName = $(this).parent().prevAll('.name-col').html();
                octopus.incrementAbsences(studentName);
                view.updateMissedCol();
            });
            
        },
        
        render: function() {
            this.renderTableHeader();
            this.renderTableBody();
        },
        
        renderTableHeader: function() {
            var htmlString = '<th class="name-col">Student Name</th>';
            for (var i = 1; i <= this.numCols; ++i) {
                htmlString += '<th>' + i + '</th>';
            }
            htmlString += '<th class="missed-col">Days Missed-col</th>';
            this.headerRow.html(htmlString);
        },
        
        renderTableBody: function() {
            var htmlString = '';
            octopus.getStudents().forEach(function(student) {
                htmlString += '<tr class="student">';
                htmlString += '<td class="name-col">' + student.name + '</td>';
                
                for (var i = 0; i < view.numCols; ++i) {
                    htmlString += '<td class="attend-col"><input type="checkbox"></td>';
                }
                
                htmlString += '<td class="missed-col">' + student.absences + '</td></tr>';
            });
            
            this.tableBody.html(htmlString);
        },
        
        updateMissedCol: function() {
            var students = octopus.getStudents();
            var rows = jQuery.makeArray($('tbody').children('tr'));

            for (var i = 0; i < students.length; ++i) {
                $(rows[i]).children('.missed-col').html(students[i].absences);
            }
        }
    };
    
    octopus.init();
});