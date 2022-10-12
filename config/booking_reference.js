const letters = "ABCDEFGHJKMNPQRSTUXY123456789";
function booking_code() {
	var text = "";
	for (var i = 0; i < 6; i++) {
		text += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	return text;
}

export default booking_code;
