const letters = "ABCDEFGHJKMNPQRSTUXY123456789";
const uniqueId = () => {
	var text = "";
	for (var i = 0; i < 6; i++) {
		text += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	return text;
};

export default uniqueId;
