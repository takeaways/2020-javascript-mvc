import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeyworldModel.js";
const tag = "[MainController]";

export default {
	init() {
		FormView.setup(document.querySelector("form")) //
			.on("@submit", (e) => this.onSubmit(e.detail.input))
			.on("@reset", (e) => this.onResetForm());

		TabView.setup(document.querySelector("#tabs")) //
			.on("@change", (e) => this.onChangeTab(e.detail.tabName));

		KeywordView.setup(document.querySelector("#search-keyword")) //
			.on("@click", (e) => this.onClickKeyword(e.detail.keyword));

		ResultView.setup(document.querySelector("#search-result"));

		this.selectedTab = "추천 검색어";
		this.renderView();
	},

	async renderView() {
		TabView.setActiveTab(this.selectedTab);

		if (this.selectedTab === "추천 검색어") {
			this.fetchSearchKeyword();
		}

		ResultView.hide();
	},

	async fetchSearchKeyword(keyword) {
		KeywordView.render(await KeywordModel.list());
	},

	async search(query) {
		try {
			const result = await SearchModel.list(query);
			FormView.setValue(query);
			this.onSearchResult(result);
		} catch (e) {
			console.log(e);
		}
	},

	onSubmit(input) {
		this.search(input);
	},
	onResetForm() {
		this.renderView();
	},
	onSearchResult(data) {
		TabView.hide();
		KeywordView.hide();
		ResultView.render(data);
	},
	onChangeTab(tabName) {
		this.selectedTab = tabName;
	},
	onClickKeyword(keyword) {
		this.search(keyword);
	},
};
