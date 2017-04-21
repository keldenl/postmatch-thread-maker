(function() {
	"use strict";
	// Custom Variables
	var match = "2";
	var rteam = "Sneaky Ticklers";
	var participants_name_red = [
		"A Kings Land",
		"snugglebutt69",
		"Lovefear",
		"naterbugz",
		"sadschaub"
	];

	var bteam = "Team Autismos United"
	var participants_name_blue = [
		"Naytax",
		"Petrifiedlizard",
		"TengoAutismo",
		"Alanepic92",
		"Hawkfalcon99"
	];

	var blue_bans_names2 = ["Vladimir", "Brand"];
	var red_bans_names2 = ["Lulu", "Ekko"];

	var mvp = "vayneklng";
	var wteam = "Team Autismos United"
	var match_code = "2464121605";

	// API
	var api = "https://na.api.pvp.net/api/lol/na/v2.2/match/" + match_code + "?api_key=" + API_KEY;

	// Result variables
	var match_duration = 0;

	// Bans
	var blue_bans_id = [];
	var blue_bans_names = [];

	var red_bans_id = [];
	var red_bans_names = [];

	// Match variables
	var blue_gold = 0;
	var blue_kills = 0;
	var blue_deaths = 0;
	var blue_assists = 0;

	var blue_tower = 0;
	var blue_drag = 0;

	var red_gold = 0;
	var red_kills = 0;
	var red_deaths = 0;
	var red_assists = 0;

	var red_tower = 0;
	var red_drag = 0;

	// Players
	var participants_stat_blue = [];
	var participants_champId_blue = [];
	var participants_champName_blue = [];

	var participants_stat_red = [];
	var participants_champId_red = [];
	var participants_champName_red = [];



	window.onload = function() {
		convert();
	};

	// Generic request function
	function sendRequest(onload, url) {
		var ajax = new XMLHttpRequest();
		ajax.onload = onload;
		// ajax.onerror = displayError;
		ajax.open("GET", url, true);
		ajax.send();
	}

	// Convert to reddit post form
	function convert() {
		sendRequest(returnText, api);
	}

	function returnText() {
		var match_data = JSON.parse(this.responseText);
		var match_duration = match_data.matchDuration;

		var blue_team = match_data.teams[0];
		var red_team = match_data.teams[1];

		var blue_bans = blue_team.bans;
		var red_bans = red_team.bans;

		// Add bans to each team's ban array
		// Add ban id
		for (var i = 0; i < blue_bans.length; i++) {
			blue_bans_id.push(blue_bans[i].championId)
		}
		for (var i = 0; i < red_bans.length; i++) {
			red_bans_id.push(red_bans[i].championId)
		}

		// Add ban name
		console.log("Blue Bans");
		for (var i = 0; i < blue_bans_id.length; i++) {
			blue_bans_names.push(convertChampId(blue_bans_id[i]));
			console.log(convertChampId(blue_bans_id[i]));
		}

		console.log("Red Bans");
		for (var i = 0; i < red_bans_id.length; i++) {
			red_bans_names.push(convertChampId(red_bans_id[i]));
			console.log(convertChampId(red_bans_id[i]));
		}


		blue_tower = blue_team.towerKills;
		red_tower = red_team.towerKills;

		blue_drag = blue_team.dragonKills +  blue_team.baronKills;
		red_drag = red_team.dragonKills + red_team.baronKills;


		// // Add summoner names
		// var participants1 = match_data.participantIdentities;

		// // Blue
		// for (var i = 0; i < 5; i++) {
		// 	participants_name_blue.push(participants[i].player.summonerName);
		// 	//console.log("Blue: " + participants[i].player.summonerName);
		// }
		// // Red
		// for (var i = 5; i < 10; i++) {
		// 	participants_name_red.push(participants[i].player.summonerName);
		// 	//console.log("Red: " + participants[i].player.summonerName);
		// }

		// Add Stats & Images
		var participant_info = match_data.participants;

		// Blue
		for (var i = 0; i < 5; i++) {
			participants_champName_blue.push(convertChampId(participant_info[i].championId));
			var kills = participant_info[i].stats.kills;
			var deaths = participant_info[i].stats.deaths;
			var assists = participant_info[i].stats.assists;

			blue_gold += participant_info[i].stats.goldEarned;
			blue_kills += kills;
			blue_deaths += deaths;
			blue_assists += assists;

			participants_stat_blue.push(kills + "-" + deaths + "-" + assists);
		}

		// Red
		for (var i = 5; i < 10; i++) {
			participants_champName_red.push(convertChampId(participant_info[i].championId));
			var kills = participant_info[i].stats.kills;
			var deaths = participant_info[i].stats.deaths;
			var assists = participant_info[i].stats.assists;

			red_gold += participant_info[i].stats.goldEarned;
			red_kills += kills;
			red_deaths += deaths;
			red_assists += assists;

			participants_stat_red.push(kills + "-" + deaths + "-" + assists);
		}

		console.log("Blue Team");
		for (var i = 0; i < 5; i++) {
			console.log(participants_champName_blue[i] + " | " + participants_name_blue[i] + " | " + participants_stat_blue[i]);
		}

		console.log(blue_kills + "-" + blue_deaths  + "-" +  blue_assists);
		console.log((blue_gold/1000).toFixed(1) + "k");

		console.log("Red Team");
		for (var i = 0; i < 5; i++) {
			console.log(participants_champName_red[i] + " | " + participants_name_red[i] + " | " + participants_stat_red[i]);
		}

		console.log(red_kills + "-" + red_deaths  + "-" +  red_assists);
		console.log((red_gold/1000).toFixed(1) + "k");

		console.log("Duration: " + (match_duration/60).toFixed(0) + "m");




		// ADD THE ACTUAL STUFF TO THE HTML
		document.getElementById("hist").innerHTML = "http://matchhistory.na.leagueoflegends.com/en/#match-details/NA1/" + match_code;
		// Team name
		var t1 = document.getElementsByClassName("t1");
		for (var i = 0; i < t1.length; i++) {
			t1[i].innerHTML = bteam;
		}
		var t2 = document.getElementsByClassName("t2");
		for (var i = 0; i < t2.length; i++) {
			t2[i].innerHTML = rteam;
		}

		document.getElementById("wt").innerHTML = wteam;

		// Bans
		document.getElementById("bban1").innerHTML =
			"[](##"+ blue_bans_names[0] +
			") [](##"+ blue_bans_names[1] +
			") [](##"+ blue_bans_names[2] +")";

		document.getElementById("bban2").innerHTML =
			"[](##"+ blue_bans_names2[0] +
			") [](##"+ blue_bans_names2[1] +
			")";

		document.getElementById("rban1").innerHTML =
			"[](##"+ red_bans_names[0] +
			") [](##"+ red_bans_names[1] +
			") [](##"+ red_bans_names[2] +")";

		document.getElementById("rban2").innerHTML =
			"[](##"+ red_bans_names2[0] +
			") [](##"+ red_bans_names2[1] +
			")";

		// Match information
		document.getElementById("dur").innerHTML = (match_duration/60).toFixed(0) + "m";
		document.getElementById("bgold").innerHTML = (blue_gold/1000).toFixed(1) + "k";
		document.getElementById("rgold").innerHTML = (red_gold/1000).toFixed(1) + "k";

		document.getElementById("bkills").innerHTML = blue_kills;
		document.getElementById("rkills").innerHTML = red_kills;

		document.getElementById("btowers").innerHTML = blue_tower;
		document.getElementById("rtowers").innerHTML = red_tower;

		document.getElementById("bepic").innerHTML = blue_drag;
		document.getElementById("repic").innerHTML = red_drag;

		document.getElementById("bkda").innerHTML = blue_kills + "-" + blue_deaths  + "-" +  blue_assists;
		document.getElementById("rkda").innerHTML = red_kills + "-" + red_deaths  + "-" +  red_assists;

		document.getElementById("mvp").innerHTML = mvp;
		document.getElementById("matchnum").innerHTML = match;

		// Player stats
		// Blue
		for (var i = 0; i < 5; i++) {
			document.getElementById("b"+i).innerHTML = participants_name_blue[i] + " [](##" + participants_champName_blue[i] + ")";
			document.getElementById("bk"+i).innerHTML = participants_stat_blue[i];
		}

		// Red
		for (var i = 0; i < 5; i++) {
			document.getElementById("r"+i).innerHTML = "[](##" + participants_champName_red[i] + ") " + participants_name_red[i];
			document.getElementById("rk"+i).innerHTML = participants_stat_red[i];
		}

		// Generating spritesheet
		// for(var i=0; i<13; i++) {
		// 	document.getElementById("code").innerHTML += '\n.md [href="##Aatrox"] { background-position: 0 '+(i*24*-1)+'px; }\n.md [href="##Ahri"] { background-position: -24px '+(i*24*-1)+'px; }\n.md [href="##Akali"] { background-position: -48px '+(i*24*-1)+'px; }\n.md [href="##Alistar"] { background-position: -72px '+(i*24*-1)+'px; }\n.md [href="##Amumu"] { background-position: -96px '+(i*24*-1)+'px; }\n.md [href="##Anivia"] { background-position: -120px '+(i*24*-1)+'px; }\n.md [href="##Annie"] { background-position: -144px '+(i*24*-1)+'px; }\n.md [href="##Ashe"] { background-position: -168px '+(i*24*-1)+'px; }\n.md [href="##AurelionSol"] { background-position: -192px '+(i*24*-1)+'px; }\n.md [href="##Azir"] { background-position: -216px '+(i*24*-1)+'px; }';
		// }
	}

	function convertChampId(champ_id) {
		var return_key = "";
		for (var key in CHAMPS_JSON.data) {
  			if (CHAMPS_JSON.data.hasOwnProperty(key)) {
  				var curr_id = CHAMPS_JSON.data[key].id;
  				var curr_key = key;
  				if (champ_id == curr_id) {
  					return_key = curr_key;
    				// console.log(CHAMPS_JSON.data[key].id + " -> " + key);
  					break;
  				}
  			}
		}
		return return_key;
	}
})();
