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

dv.table(["Date", "", "Bedtime", "", "Wakeup", "", "In Bed (min)"], 
dv.pages("#journal")
	.sort(p => p.file.ctime, "desc")
	.map(p => [p.file.link, 
	actionDot("bedtime",p.bedtime),
	p.bedtime,
	actionDot("wakeup",p.wakeup),
	p.wakeup,
	actionDot("stay",p.stay),
	p.stay
		])
)

//Sets all columns to the same width
this.container.querySelectorAll(".table-view-table td").forEach(s => s.style.width ="200px");

for (let i = 2; i < 8; i+=2) {  
  this.container.querySelectorAll(".table-view-table td:nth-child(" + i + ")").forEach(s => s.style.width = "50px");
}



// Put all dataviewjs in a scroll view
let elements = document.getElementsByClassName('block-language-dataviewjs'); for (let i = 0; i < elements.length; i++) { let item = elements.item(i); item.setAttribute("style", "height:500px;width:720px;overflow:auto;"); }

// ```