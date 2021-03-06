export default async function({
	isDev,
	env,
	req,
	app,
	store: { commit, state, dispatch },
	redirect
}) {
	let language;
	if (process.browser) {
		language =
			window.navigator.language ||
			window.navigator.systemLanguage ||
			window.navigator.userLanguage;
	} else if (req) {
		language = req.headers["accept-language"];
	} else {
		language = "ru";
	}
	if (language) {
		language = language.substr(0, 2).toLowerCase();
	}
	let locale;
	if (
		["ru", "be", "uk", "ky", "ab", "mo", "et", "lv"].indexOf(language) != -1
	) {
		locale = "ru";
	} else {
		locale = "ru";
	}

	if (
		typeof app.$cookiz.get("locale") !== "undefined" &&
		state.language.indexOf(app.$cookiz.get("locale")) != -1
	) {
		locale = app.$cookiz.get("locale");
	}

	if (state.locale != locale) {
		dispatch("setLocale", locale);
	}

	let theme = "light";
	if (typeof app.$cookiz.get("theme") !== "undefined") {
		theme = app.$cookiz.get("theme");
	}
	if (state.theme != theme) {
		dispatch("setThemes", theme);
	}
	let UserAgent;
	if (process.browser) {
		UserAgent = navigator.userAgent;
	} else if (req) {
		UserAgent = req.get("User-Agent");
	} else {
		UserAgent = "";
	}

	if (GetIEVersion(UserAgent)) {
		redirect("/ie");
	}
}

function GetIEVersion(UserAgent) {
	const Idx = UserAgent.indexOf("MSIE");
	if (Idx > 0) return true;
	if (UserAgent.match(/Trident\/7\./)) return true;
	return false;
}
