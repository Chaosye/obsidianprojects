// ```dataviewjs
// This is meant for use with Dataview's dataviewjs options in Obsidian.
// Idea for action dots is from https://nightingaledvs.com/why-i-stopped-using-bullet-graphs-and-what-i-now-use-instead/

function actionDot(category, value){
    switch (category) {
        case "bedtime":
            if (value >= 2 && value < 10) { return "🔴" }
            if (value <= 11 && value >= 1) { return "🟡" }
            return ""
        case "wakeup":
            if (value >= 10) { return "🔴" }
            if (value <= 7) { return "🟡" }
            return ""
        case "stay":
            if (value >= 30) { return "🟡" }
            if (value >= 60) { return "🔴" }
            return ""    
    }
    return ""
}

function clockTime(number) {
  // Check if the number is already in clock format
  let stringCopy = String(number)
  if (stringCopy.includes(":")) {
    // Return the number as a clock time string
    return stringCopy;
  }

  // Split the number into the integer part and decimal part
  const hours = Math.floor(number);
  const minutes = Math.round((number % 1) * 60);

  // Pad the hours and minutes with leading zeros if necessary
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  // Create the clock time string in the format HH:MM
  const clockTime = `${paddedHours}:${paddedMinutes}`;

  return clockTime;
}

// Creating table using Dataview's functions
dv.table(["Date", "", "Bedtime", "", "Wakeup", "", "Hours Slept", "", "In Bed (min)"], 
dv.pages("#journal")
	.sort(p => p.file.ctime, "desc")
	.map(p => [p.file.link, 
	actionDot("bedtime",p.bedtime),
	clockTime(p.bedtime),
	actionDot("wakeup",p.wakeup),
	clockTime(p.wakeup),
	"",
	String(p.wakeup - p.bedtime),
	actionDot("stay",p.stay),
	p.stay
		])
)

//Sets all columns to the same width
this.container.querySelectorAll(".table-view-table td").forEach(s => s.style.width ="150px");

//Sets alert dot columns to a shorter width, does so by assuming every 2nd column is for a dot
for (let i = 2; i < 10; i+=2) {  
  this.container.querySelectorAll(".table-view-table td:nth-child(" + i + ")").forEach(s => s.style.width = "10px");
}


// Put all dataviewjs in a scroll view
let elements = document.getElementsByClassName('block-language-dataviewjs'); for (let i = 0; i < elements.length; i++) { let item = elements.item(i); item.setAttribute("style", "height:500px;width:720px;overflow:auto;"); }

// ```
