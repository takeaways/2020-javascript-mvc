import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";

import SearchModel from "../models/SearchModel.js";
const tag = "[MainController]";

export default {
	init() {
		FormView.setup(document.querySelector("form")) //
			.on("@submit", (e) => this.onSubmit(e.detail.input))
			.on("@reset", (e) => this.onResetForm());

		TabView.setup(document.querySelector("#tabs")) //
			.on("@change", (e) => this.onChangeTab(e.detail.tabName));

		ResultView.setup(document.querySelector("#search-result"));

		this.selectedTab = "추천 검색어";
		this.renderView();
	},

	renderView() {
		TabView.setActiveTab(this.selectedTab);
		ResultView.hide();
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
	onChangeTab(tabName) {
		this.selectedTab = tabName;
	},
};
