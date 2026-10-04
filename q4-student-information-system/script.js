// Student Information System - jQuery code

var editRow = null;    // remembers the row we are editing (null = we are adding)

// Make one table row for a student
function makeRow(roll, name, course, email) {
  var row = $("<tr></tr>");
  row.append($("<td></td>").text(roll));
  row.append($("<td></td>").text(name));
  row.append($("<td></td>").text(course));
  row.append($("<td></td>").text(email));
  row.append('<td><button class="btn btn-sm btn-warning edit-btn">Edit</button> ' +
             '<button class="btn btn-sm btn-danger delete-btn">Delete</button></td>');
  return row;
}

// Count the rows and show the total
function updateTotal() {
  $("#total").text($("#studentTable tbody tr").length);
}

// Show a message box for 2.5 seconds
function showMessage(text, type) {
  var box = $('<div class="alert alert-' + type + '"></div>').text(text);
  $("#msg").empty().append(box).hide().slideDown();
  setTimeout(function () {
    $("#msg").slideUp();
  }, 2500);
}

// Clear the form and go back to "Add" mode
function resetForm() {
  $("#studentForm")[0].reset();
  editRow = null;
  $("#formTitle").text("Add New Student");
  $("#saveBtn").text("Add Student");
  $("#cancelBtn").hide();
}

$(document).ready(function () {

  // Some students to start with
  var sample = [
    ["101", "Amit Kumar", "B.Tech", "amit@example.com"],
    ["102", "Neha Singh", "BCA", "neha@example.com"],
    ["103", "Rahul Verma", "MBA", "rahul@example.com"]
  ];
  $.each(sample, function (i, s) {
    $("#studentTable tbody").append(makeRow(s[0], s[1], s[2], s[3]));
  });
  updateTotal();

  // EVENT: submit - Add a new student OR update the student we are editing
  $("#studentForm").on("submit", function (event) {
    event.preventDefault();                       // stop page reload
    var roll = $("#roll").val().trim();
    var name = $("#name").val().trim();
    var course = $("#course").val();
    var email = $("#email").val().trim();

    if (editRow === null) {
      // ADD: first check that the roll number is not used
      var found = false;
      $("#studentTable tbody tr").each(function () {
        if ($(this).find("td").eq(0).text() === roll) {
          found = true;
        }
      });
      if (found) {
        showMessage("This roll number already exists!", "danger");
        return;
      }
      var row = makeRow(roll, name, course, email);
      row.hide();
      $("#studentTable tbody").append(row);
      row.fadeIn(600);                            // effect
      showMessage("Student added successfully.", "success");
    } else {
      // MODIFY: change the text of the cells in the row
      var cells = editRow.find("td");
      cells.eq(0).text(roll);
      cells.eq(1).text(name);
      cells.eq(2).text(course);
      cells.eq(3).text(email);
      var changedRow = editRow;
      changedRow.addClass("table-success");       // green for 1.5 seconds
      setTimeout(function () {
        changedRow.removeClass("table-success");
      }, 1500);
      showMessage("Student updated successfully.", "info");
    }

    updateTotal();
    resetForm();
  });

  // The rows are added by jQuery, so I use the table for these click events.

  // EVENT: click - Edit button (copy the row data into the form)
  $("#studentTable").on("click", ".edit-btn", function () {
    editRow = $(this).closest("tr");
    var cells = editRow.find("td");
    $("#roll").val(cells.eq(0).text());
    $("#name").val(cells.eq(1).text());
    $("#course").val(cells.eq(2).text());
    $("#email").val(cells.eq(3).text());
    $("#formTitle").text("Edit Student");
    $("#saveBtn").text("Update Student");
    $("#cancelBtn").show();
    $("#formBody").slideDown();                   // open the form if it is hidden
    $("#name").focus();
  });

  // EVENT: click - Delete button
  $("#studentTable").on("click", ".delete-btn", function () {
    var row = $(this).closest("tr");
    var name = row.find("td").eq(1).text();
    if (confirm("Remove " + name + "?")) {
      if (editRow !== null && editRow.is(row)) {
        resetForm();
      }
      row.fadeOut(500, function () {              // effect, then remove the row
        row.remove();
        updateTotal();
      });
      showMessage(name + " was removed.", "warning");
    }
  });

  // EVENT: click - Remove All button
  $("#clearAll").on("click", function () {
    if (confirm("Remove all students?")) {
      $("#studentTable tbody tr").fadeOut(400, function () {
        $(this).remove();
        updateTotal();
      });
    }
  });

  // EVENT: click - Cancel button
  $("#cancelBtn").on("click", resetForm);

  // EVENT: click - Hide/Show the form
  $("#toggleForm").on("click", function () {
    $("#formBody").slideToggle();
  });

  // EVENT: keyup - search by name
  $("#searchBox").on("keyup", function () {
    var text = $(this).val().toLowerCase();
    $("#studentTable tbody tr").each(function () {
      var name = $(this).find("td").eq(1).text().toLowerCase();
      $(this).toggle(name.indexOf(text) !== -1);
    });
  });

  // EVENT: mouseenter and mouseleave - yellow row when the mouse is over it
  $("#studentTable").on("mouseenter", "tbody tr", function () {
    $(this).addClass("table-warning");
  }).on("mouseleave", "tbody tr", function () {
    $(this).removeClass("table-warning");
  });

});
