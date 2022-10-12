const letters = "ABCDEFGHJKMNPQRSTUXY123456789";
export const uniqueId = () => {
	var text = "";
	for (var i = 0; i < 6; i++) {
		text += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	return text;
};
