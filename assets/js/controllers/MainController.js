import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";

import SearchModel from "../models/SearchModel.js";
const tag = "[MainController]";

export default {
	init() {
		FormView.setup(document.querySelector("form")) //
			.on("@submit", (e) => this.onSubmit(e.detail.input))
			.on("@reset", (e) => this.onResetForm());

		ResultView.setup(document.querySelector("#search-result"));
	},

	async search(query) {
		try {
			const result = await SearchModel.list(query);
			this.onSearchResult(result);
		} catch (e) {
			console.log(e);
		}
	},

	onSubmit(input) {
		this.search(input);
	},
	onResetForm() {
		ResultView.hide();
	},
	onSearchResult(data) {
		ResultView.render(data);
	},
};
