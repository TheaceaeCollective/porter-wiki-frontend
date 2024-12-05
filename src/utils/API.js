import DefaultAvatar from '../assets/images/avatar.png';
import { reactive } from 'vue';
import Toast from "./Toast";
import Config from "./Config";

export default class API {
    static url = Config.backendURL;

    static async get(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'GET',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
        }).then(async response => {
			let responseData;
			try { if (responseData == null) responseData = (typeof response.json == "function") ? await response.json() : null; } catch { };
			try { if (responseData == null) responseData = (typeof response.text == "function") ? await response.text() : null; } catch { };
			return { status: response.status, data: responseData || {} };
		}).catch(async response => { return { status: response.status, data: (typeof response.text == "function" ? await response.text() : response) } });
    }

    static async post(endpoint, body, options) {
		if (!options) options = {};
		if (options.noStringify == null) options.noStringify = false;

        return fetch(this.url + endpoint, {
            method: 'POST',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
            body: options.noStringify ? body : JSON.stringify(body),
        }).then(async response => {
			let responseData;
			try { if (responseData == null) responseData = (typeof response.json == "function") ? await response.json() : null; } catch { };
			try { if (responseData == null) responseData = (typeof response.text == "function") ? await response.text() : null; } catch { };
			return { status: response.status, data: responseData || {} };
		}).catch(async response => { return { status: response.status, data: (typeof response.text == "function" ? await response.text() : response) } });
    }

    static async put(endpoint, body, options) {
		if (!options) options = {};
		if (options.noStringify == null) options.noStringify = false;

        return fetch(this.url + endpoint, {
            method: 'PUT',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
            body: options.noStringify ? body : JSON.stringify(body),
        }).then(async response => {
			let responseData;
			try { if (responseData == null) responseData = (typeof response.json == "function") ? await response.json() : null; } catch { };
			try { if (responseData == null) responseData = (typeof response.text == "function") ? await response.text() : null; } catch { };
			return { status: response.status, data: responseData || {} };
		}).catch(async response => { return { status: response.status, data: (typeof response.text == "function" ? await response.text() : response) } });
    }

    static async patch(endpoint, body, options) {
		if (!options) options = {};
		if (options.noStringify == null) options.noStringify = false;

        return fetch(this.url + endpoint, {
            method: 'PATCH',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
            body: options.noStringify ? body : JSON.stringify(body),
        }).then(async response => {
			let responseData;
			try { if (responseData == null) responseData = (typeof response.json == "function") ? await response.json() : null; } catch { };
			try { if (responseData == null) responseData = (typeof response.text == "function") ? await response.text() : null; } catch { };
			return { status: response.status, data: responseData || {} };
		}).catch(async response => { return { status: response.status, data: (typeof response.text == "function" ? await response.text() : response) } });
    }

    static async delete(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'DELETE',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
        }).then(async response => {
			let responseData;
			try { if (responseData == null) responseData = (typeof response.json == "function") ? await response.json() : null; } catch { };
			try { if (responseData == null) responseData = (typeof response.text == "function") ? await response.text() : null; } catch { };
			return { status: response.status, data: responseData || {} };
		}).catch(async response => { return { status: response.status, data: (typeof response.text == "function" ? await response.text() : response) } });
    }

	static user = reactive({
		username: "Not logged in!",
		nickname: "",
		avatar: DefaultAvatar,
		comments: 0,
		join: null,
		id: 0,
		staff: false,
		color: "#FFFFFF",
		loggedIn: false,
		attemptToken: 0
	});

	static cookie_name_token = "wiki-auth-token";
	static cookie_name_user = "wiki-auth-user";
	static maxTokenAttempts = 3;

	static setData = (user = {}) => {
		this.user.loggedIn = (user.name && user.id);
		this.user.id = user.id || 0;
		this.user.username = user.name || "Not logged in!";
		this.user.nickname = user.nick || null;
		this.user.join = user.join || null;
		this.user.comments = user.comments || 0;
		this.user.avatar = user.avatar || DefaultAvatar;
		this.user.color = user.color || "#FFFFFF";
		this.user.staff = user.staff || false;
		this.user.attemptToken = 0;
	}

	static fetchUser = async() => {
		if (this.user.attemptToken >= this.maxTokenAttempts) return; // dont attempt if attempted already.

		let user = $cookies.get(this.cookie_name_user);
		let token = $cookies.get(this.cookie_name_token);
		if (!user) user = {};

		if (user && user?.username) this.setData(user);

		if (token) {
			const data = await this.get("/account");
			this.user.attemptToken++;

			if (data == null || data.status != 200) {
				if (data.status == 404) {
					this.user.attemptToken = 0; // reset to 0.

					// i dont like this. we need to seriously get rid of this - john
					Toast.showToast("Failed to login as you are not in the server!\nClick this toast to open the Discord server invite (in a new tab)!", { type: "error", onClick: () => { window.open("https://discord.gg", "_blank") } })
					this.performLogout(true);
				} else {
					let isDueToBadToken = (data.status == 401);
					if (this.user.attemptToken >= this.maxTokenAttempts) {
						if (isDueToBadToken) {
							Toast.showToast("Your session has expired.\nPlease login again.", { type: "error" });
							this.performLogout(true);
						} else {
							Toast.showToast("Failed to login! Please try again.\nIf this keeps happening, please report to the developers.", { type: "error" });
						};
					} else {
						setTimeout(this.fetchUser, (isDueToBadToken ? 1500 : 5000));
					};
				};
				return;
			} else {
				this.user.attemptToken = 0; // reset to 0.
			};

			if (user == "new_login")
				Toast.showToast("Successfully logged in!", { type: "success" });

			user = data.data;
			$cookies.set(this.cookie_name_user, JSON.stringify(user));
			this.setData(user);
		};
	}

	static performLogout = async() => {
		$cookies.remove(this.cookie_name_token);
		$cookies.remove(this.cookie_name_user);
		this.setData({});
		Toast.showToast("Successfully logged out!", { type: "success" });
	}

	static performLogin = async() => {
		let popupWindow;
		// Create Discord popup
		const popupParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=960,height=727";
		popupWindow = window.open(
			`https://discord.com/oauth2/authorize?response_type=token&client_id=${Config.Discord.ClientID}&scope=identify&redirect_uri=${window.location.protocol}//${window.location.host}/oauthComplete`,
			"popup",
			popupParams
		);
		popupWindow.focus();

		const popupMsgAlert = setInterval(() => { popupWindow.postMessage('', `${window.location.protocol}//${window.location.host}/`); }, 500);

		// This stupid thing will wait for the oauth complete page to send back our required data :)
		window.addEventListener("message", async(event) => {
			if (popupWindow && !popupWindow.closed && (event.data.token || event.data.error)) {
				// We should have the data by now.
				setTimeout(() => popupWindow.close(), event.data.token ? 0 : 1500);
				clearInterval(popupMsgAlert);

				// If token - set up cookies | If error - fail
				if (event.data.token) {
					$cookies.set(API.cookie_name_token, event.data.token);
					$cookies.set(API.cookie_name_user, "new_login");

					API.fetchUser(); // Now that we are logged in, let's GOOOOOOOOOOOOOOOOOOOOOO
				} else {
					if (event.data.error == "access_denied")
						Toast.showToast("You denied the login request.\nPlease login again.", { type: "error" });
					else
						Toast.showToast("Failed to login! Please try again.\nIf this keeps happening, please report to the developers.", { type: "error" });
				};
			};
		});

		window.addEventListener("beforeunload", (event) => {
			if (popupWindow && !popupWindow.closed) { popupWindow.close(); };
		});
	}
}

function createHeaders(token = null) {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (token) {
        headers.Authorization = token;
    }

    return headers;
}