const commands = ["add", "del", "done", "ls", "report", "help"];
const fs = require("fs");
const argss = process.argv;
const add_ = () => {
  if (argss[3]) {
    var data = argss.slice(3);
    console.log(
      "Added task: " + '"' + data.slice(1) + '"' + " with priority " + data[0]
    );
    data = data.join(". ");
    if (fs.existsSync("task.txt")) {
      fs.appendFile("task.txt", data + "\n", (err) => {
        if (err) throw err;
      });
    } else {
      fs.writeFile("task.txt", data + "\n", (err) => {
        if (err) throw err;
      });
    }
  } else {
    console.log("Error: Missing tasks string. Nothing added!");
  }
};
const del_ = () => {
  if (argss[3]) {
    var read = fs.readFileSync("task.txt", "utf-8");
    if (argss[3] != 0 && argss[3] <= read.split("\n").length - 1) {
      if (read.split("\n").length > 2) {
        console.log("DELETED" + argss[3]);
        read = read.replace(read.split("\n")[argss[3] - 1], "");
        read = read.split("\n");
        read = read.filter(function (e) {
          return e;
        });
        read = read.toString();
        var myRegEx = /\,/g;
        read = read.replace(myRegEx, "\n") + "\n";
        console.log("Deleted task #" + argss[3]);
        fs.writeFile("task.txt", read, (err) => {
          if (err) throw err;
        });
      } else {
        read = "";
        fs.writeFile("task.txt", read, (err) => {
          if (err) throw err;
        });
        console.log("Deleted task #" + argss[3]);
      }
    } else {
      console.log(
        "Error: task with index" +
          " #" +
          argss[3] +
          " does not exist. Nothing deleted."
      );
    }
  } else {
    console.log("Error: Missing NUMBER for deleting tasks.");
  }
};

const report_ = () => {
  if (fs.existsSync("task.txt")) {
    var read_task = fs.readFileSync("task.txt", "utf-8");
    read_task = read_task.split("\n");
    read_task = read_task.filter(function (e) {
      return e;
    });
  } else {
    var read_task = 0;
  }
  if (fs.existsSync("completed.txt")) {
    var read_done = fs.readFileSync("completed.txt", "utf-8");
    var done_1 = read_done;
    read_done = read_done.split("\n");
    read_done = read_done.filter(function (e) {
      return e;
    });
  } else {
    var read_done = 0;
  }
  console.log(
    "Pending : " +
      read_task.length +
      "\n" +
      read_task +
      " [" +
      read_task.length +
      "]." +
      "\nCompleted : " +
      read_done.length +
      "\n" +
      ((done_1[0] == 0) ? ("1" + done_1.substring(1)) : read_done)  
  );
};
const ls_ = () => {
  if (fs.existsSync("task.txt")) {
    var read = fs.readFileSync("task.txt", "utf-8");
    read = read.split("\n");
    read = read.filter(function (e) {
      return e;
    });
    for (i = 0; i < read.length; i++) {
      console.log(read[i] + " [" + (i + 1) + "]");
    }
  } else {
    console.log("There are no pending tasks!");
  }
};
const done_ = () => {
  if (argss[3]) {
    var read = fs.readFileSync("task.txt", "utf-8");
    var myregex = /\,/g;
    var data = read.split("\n")[argss[3] - 1];
    if (argss[3] != 0 && argss[3] <= read.split("\n").length - 1) {
      console.log("Marked item as done.");
      if (read.split("\n").length > 2) {
        read = read.replace(data, "");
        read = read.split("\n");
        read = read.filter(function (e) {
          return e != undefined;
        });
        read = read.filter(function (e) {
          return e;
        });
        read = read.toString();
        read = read.replace(myregex, "\n") + "\n";
        fs.writeFile("task.txt", read, (err) => {
          if (err) throw err;
        });
      } else {
        read = "";
        fs.writeFile("task.txt", read, (err) => {
          if (err) throw err;
        });
      }
    } else {
      console.log(
        "Error: no incomplete item with index #" + argss[3] + " exists."
      );
    }

    data = data + "\n";
    if (fs.existsSync("completed.txt")) {
      fs.appendFile("completed.txt", data, (err) => {
        if (err) throw err;
      });
    } else {
      fs.writeFile("completed.txt", data, (err) => {
        if (err) throw err;
      });
    }
  } else {
    console.log("Error: Missing NUMBER for marking tasks as done.");
  }
};
const usage_ = () => {
  var text = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`;
  console.log(text);
};
if (argss.length > 2 && commands.indexOf(argss[2]) != -1) {
  switch (argss[2]) {
    case "add":
      add_();
      break;
    case "del":
      del_();
      break;
    case "done":
      done_();
      break;
    case "ls":
      ls_();
      break;
    case "report":
      report_();
      break;
    case "help":
      usage_();
      break;
    default:
      usage_();
  }
} else {
  usage_();
}
