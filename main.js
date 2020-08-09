var list_days = [];
var title = document.getElementById("calender_title");


function draw_calender() {      //Creates the table for days in month
  
    var count = 1;
  var calender = document.getElementById("days_frame");

  for (let i = 0; i < 6; i++) {
      var row = document.createElement("div");
      row.className = "week";
      calender.appendChild(row);
    for (let j = 0; j < 7; j++) {
      var column = document.createElement("div");
      column.className = "day";
      row.appendChild(column);
      column.id = count;
      column.style.visibility = "hidden";
      count += 1;
      row.appendChild(column);
    }
  }
}

async function display_current_month() {    //Displays current month when opening calendar

  var month_info = await eel.month_info_py(0)();
  var first_day = month_info[0];
  var days_in_month = month_info[1];

  title.innerHTML = "";
  title.innerHTML = ("Current month: "+month_info[2]+"."+month_info[3]);

  update_dayinfo(month_info[4]);

  for (let i = first_day; i <= days_in_month+first_day; i++) {
    list_days.push(i.toString());
  }

  var counter = 0;
  for (let j = first_day; j < 40; j++) {
    counter += 1;  
    var block = document.getElementsByClassName("day")[j];
    if (block.id === list_days[counter]) {
      block.style.visibility = "visible";
      block.innerHTML = counter;
      }
  } 
}

async function month_move(direction) {    //Function to move from current month to next or previous

    if (direction == 1) {
        var month_info = await eel.month_info_py(1)();
    }
    else if (direction == -1) {
        var month_info = await eel.month_info_py(-1)();
    }
    else {
        console.log("Error with direction.");
    }

    title.innerHTML = "";
    title.innerHTML = ("Current month: "+month_info[2]+"."+month_info[3]);

    var first_day = month_info[0];
    var days_in_month = month_info[1];
    list_days.length = 0;

    for (let i = first_day; i <= days_in_month+first_day; i++) {
        list_days.push(i.toString());
    }

    for (let x = 0; x < first_day; x++) {
        var block = document.getElementsByClassName("day")[x];
        block.style.visibility = "hidden";
        block.innerHTML = "";
    }

    var counter = 0;
    for (let j = first_day; j < 40; j++) {
        counter += 1;  
        var block = document.getElementsByClassName("day")[j];
        if (block.id === list_days[counter]) {
            block.style.visibility = "visible";
            block.innerHTML = "";
            block.innerHTML = counter;
        }
        else {
            block.style.visibility = "hidden";
            block.innerHTML = "";
        }
    } 
}

function render_dayinfo() {

    var box = document.getElementById("days_frame");
    var title = document.createElement("div");
    title.id = "title";
    box.appendChild(title);
    var tasks = document.createElement("div");
    tasks.id = "tasks";
    box.appendChild(tasks);

    box.appendChild(title);
    box.appendChild(tasks);
    }

    async function update_dayinfo(day) {

    var box = document.getElementById("days_frame");
    var title = document.getElementById("title");
    var tasks = document.getElementById("tasks");

}

function tile_click() {

    var day_info_block = document.getElementById("days_frame");

    document.getElementById("days_frame").addEventListener("click", (event) => {
    if (event.target.style.visibility === "visible") {
        clear_borders();
        var day_of_block = event.target.innerHTML;
        update_dayinfo(day_of_block);
        event.target.style.border = "red 1px solid";
    }
    })
}

function clear_borders() {

    for (let i = 0; i < 40; i++) {
        var block = document.getElementsByClassName("day")[i];
        if (block.style.border === "1px solid red" && block.style.visibility === "visible") {
            block.style.border = "whitesmoke 1px solid";
        }
    }
}

function add_event() {

    var new_event_title = document.getElementById("event_title").value.toString();
    var new_event_date = document.getElementById("event_days").value.toString();
    var new_event_deadline = document.getElementById("deadline_day").value.toString();
    var new_event_class = document.getElementById("class").value.toString();
    console.log(new_event_title, new_event_date, new_event_deadline, new_event_class);

    var event_block = document.getElementById("new_event_create");
    event_block.style.display = "none";
}


function hide_event_creation() {

    var event_block = document.getElementById("new_event_create");

    if (event_block.style.display == "none")  {
        event_block.style.display = "block";
    }
    else {
        event_block.style.display = "none";
    }
}

function hide_class_creation() {
        
    var event_block = document.getElementById("class_box");

    if (event_block.style.display == "none")  {
        event_block.style.display = "block";
    }
    else {
        event_block.style.display = "none";
    }
}

function main() {

    while(true) {
        draw_calender();
        display_current_month();
        render_dayinfo();
        tile_click();
        document.getElementById("prev").onclick = function() {month_move(-1)};
        document.getElementById("next").onclick = function() {month_move(1)};
        document.getElementById("new_event").onclick = function() {hide_event_creation()};
    }
}

main();