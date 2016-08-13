function Clock(hour, minute, second, month, day, year, ampm) {
        this.second = second;
       	this.minute = minute;
        this.hour = hour;
       	this.day = day;
        this.month = month;
	this.year = year;
	this.ampm = ampm;
}        

Clock.now = function() {
	return new Clock(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMonth() + 1, new Date().getDate(), new Date().getFullYear(), new Date().getHours() < 12 ? "am" : "pm");
}

Clock.dayOfWeek = function(clock) {
	return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
}

Clock.daysInYear = function(year) {
	if(year % 4 == 0 && year % 400 == 0) {
		return 366;
	}
	return 365;
}

Clock.daysInMonth = function(month, year) {
	if(month == 1) {
		return 31;
	}
	if(month == 2) {
		if(year % 4 == 0 && year % 400 == 0) {
			return 29;
		}
                return 28;
        }
	if(month == 3) {
                return 31;
        }
	if(month == 4) {
                return 30;
        }
	if(month == 5) {
                return 31;
        }
	if(month == 6) {
                return 30;
        }
	if(month == 7) {
                return 31;
        }
	if(month == 8) {
                return 31;
        }
        if(month == 9) {
                return 30;
        }
        if(month == 10) {
                return 31;
        }
        if(month == 11) {
                return 30;
        }
        if(month == 12) {
                return 31;
        }
}

Clock.prototype.ticks = function() {
	var ticks = this.second + this.minute * 60;
	if(this.ampm == "am") {
		ticks += this.hour * 60 * 60;
	}
	else {
		ticks += ((12 * 60 * 60) + (this.hour * 60 * 60));
	}
	for(i = 1; i < this.month; i++) {
		ticks += Clock.daysInMonth(this.month, this.year) * 24 * 60 * 60;	
	}
	ticks += this.day * 24 * 60 * 60;
	
	for(i = this.year - 1; i < this.year; i++) {
		ticks += Clock.daysInYear(this.year) * 24 * 60 * 60;
	}
	return ticks;
}

Clock.prototype.clone = function() {
	return new Clock(this.hour, this.minute, this.second, this.month, this.day, this.year, this.ampm);
}

Clock.prototype.addYears = function(years) {
	var toReturn = this.clone();
        for(var i=0; i<year; i++) {
                toReturn = toReturn.addMonths(12);
        }
        return toReturn;
}

Clock.prototype.addMonths = function(months) {
        var toReturn = this.clone();
        for(var i=0; i<months; i++) {
		toReturn = toReturn.addDays(DateTime.daysInMonth(toReturn.month, toReturn.year));
        }
	return toReturn;
}

Clock.prototype.addDays = function(days) {
	var toReturn = this.clone();   
        for(var i=0; i<days; i++) {
        	toReturn = toReturn.addHours(24);
        }
	return toReturn;
}

Clock.prototype.addHours = function(hours) {
	var toReturn = this.clone();   
	for(var i=0; i<hours; i++) {
		toReturn = toReturn.addMinutes(60);
	}
	return toReturn;
}

Clock.prototype.addMinutes = function(minutes) {
	var toReturn = this.clone();
	for(var i=0; i<minutes; i++) {
		toReturn = toReturn.addSeconds(60);
	}
	return toReturn;
}
	
Clock.prototype.addSeconds = function(seconds) {
	var toReturn = this.clone();   
        for(var i=0; i<seconds; i++) {
		toReturn.second = toReturn.second + 1;
		if(toReturn.second == 60) {
			toReturn.second = 0;
			toReturn.minute = toReturn.minute + 1;
		}
		if(toReturn.minute == 60) {
			toReturn.second = 0;
			toReturn.minute = 0;
			toReturn.hour = toReturn.hour + 1;                
		}
		if(toReturn.hour == 12 && toReturn.minute == 0 && toReturn.second == 0) {
			if(toReturn.ampm == "am") {
				toReturn.ampm = "pm";
			}
			else {
				toReturn.ampm = "am";
			}			
			toReturn.day = toReturn.day + 1;
		}
		if(toReturn.hour == 13) {
			toReturn.second = 0;
			toReturn.minute = 0;
			toReturn.hour = 1;
                }
		if(toReturn.day == Clock.daysInMonth(toReturn.month, toReturn.year) + 1) {
			toReturn.second = 0;
			toReturn.minute = 0;
			toReturn.hour = 1;
			toReturn.day = 1;
			toReturn.month = toReturn.month + 1;
                }
		if(toReturn.month == 13) {
			toReturn.second = 0;
			toReturn.minute = 0;
			toReturn.hour = 1;
			toReturn.day = 1;
			toReturn.month = 1;
			toReturn.year = toReturn.year + 1;
                }
        }
	return toReturn;
}
