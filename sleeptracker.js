// ```dataviewjs

function actionDot(category, value){
	var color = ""
	switch (category) {
		case "bedtime":
			if (value >= 3 && value < 10) {var color = "🔴"}
			if (value <= 11 && value >= 1) {var color = "🟡"}
			return color
			break
		case "wakeup":
			if (value > 10) {var color = "🔴"}
			if (value < 7) {var color = "🟡"}
			return color
			break
		case "stay":
			if (value > 30) {var color = "🟡"}
			if (value > 60) {var color = "🔴"}
			return color
			break
		default:
			var color = " "
		
	}
	
	return color
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

dv.table(["Date", "", "Bedtime", "", "Wakeup","Hours Slept", "", "In Bed (min)"], 
dv.pages("#journal")
	.sort(p => p.file.ctime, "desc")
	.map(p => [p.file.link, 
	actionDot("bedtime",p.bedtime),
	clockTime(p.bedtime),
	actionDot("wakeup",p.wakeup),
	clockTime(p.wakeup),
	String(p.wakeup - p.bedtime),
	actionDot("stay",p.stay),
	p.stay
		])
)

//Sets all columns to the same width
this.container.querySelectorAll(".table-view-table td").forEach(s => s.style.width ="150px");

for (let i = 2; i < 8; i+=2) {  
  this.container.querySelectorAll(".table-view-table td:nth-child(" + i + ")").forEach(s => s.style.width = "10px");
}



// Put all dataviewjs in a scroll view
let elements = document.getElementsByClassName('block-language-dataviewjs'); for (let i = 0; i < elements.length; i++) { let item = elements.item(i); item.setAttribute("style", "height:500px;width:720px;overflow:auto;"); }

// ```