/**
 * Created by lx4r on 20.08.16.
 */

var fs = require('fs');
var projectsStorage = require('./projectsStorage.js');
var projects = projectsStorage.readProjects();
console.log(projects);
updateProjectsTable();

$('#addProjectButton').on('click', function () {
    // Don't create a new project if the input fpr the project name is empty
    if (!projectName.value){
        return;
    }
    // Add the new project to the project map with the fresh ID from the save file as ID
    projects[1].set(projects[0], {name: projectName.value, totalTime: 0});
    // Increment the fresh ID
    projects[0]++;
    projectName.value = "";
    updateProjectsTable();
    projectsStorage.saveProjects(projects);
});

$('.deleteProjectButton').on('click', function () {
    // Delete the activity with the ID stored in the clicked button from the activity map, update the activities table and save the new storage array to the JSON file
    var id = $(this).data('id');
    projects[1].delete(id);
    updateProjectsTable();
    projectsStorage.saveProjects(projects);
});

function updateProjectsTable() {
    // If the projects file only contains the fresh id
    if (projects.length == 1){
        projectsTable.innerHTML = "No projects";
        return;
    }
    var output = '<table class="table"><tr><th>Project name</th><th></th></tr>';
    // Loop over the projects map
    projects[1].forEach(function (elem, id) {
        output +=
            "<tr>" +
            "<td>" +
            elem.name +
            "</td>" +
            '<td>' +
                '<button type="button" class="btn btn-xs btn-danger deleteProjectButton" aria-label="Left Align" data-id="' + id + '">' +
                    '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete' +
                '</button>' +
            '</td>';
    });
    output += "</table>";
    projectsTable.innerHTML = output;
}