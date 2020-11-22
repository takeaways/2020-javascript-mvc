import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeyworldModel.js";
import HistoryView from "../views/HistoryView.js";
import HistoryModel from "../models/HistoryModel.js";
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

		HistoryView.setup(document.querySelector("#search-history")) //
			.on("@click", (e) => this.onClickHistory(e.detail.keyword))
			.on("@delete", this.onDeleteHistory.bind(this));

		ResultView.setup(document.querySelector("#search-result"));

		this.selectedTab = "추천 검색어";
		this.renderView();
	},

	async renderView() {
		TabView.setActiveTab(this.selectedTab);

		switch (this.selectedTab) {
			case "추천 검색어":
				this.fetchSearchKeyword();
				HistoryView.hide();
				break;
			case "최근 검색어":
				this.fetchSearchHistory();
				KeywordView.hide();
		}

		ResultView.hide();
	},

	async fetchSearchKeyword(keyword) {
		KeywordView.render(await KeywordModel.list());
	},
	async fetchSearchHistory(keyword) {
		HistoryView.render(await HistoryModel.list());
	},
	async deleteHistory(keyword) {
		HistoryModel.remove(keyword);
		this.renderView();
	},

	async search(query) {
		try {
			HistoryModel.add(query);
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
		HistoryView.hide();
		ResultView.render(data);
	},
	onChangeTab(tabName) {
		this.selectedTab = tabName;
		this.renderView();
	},
	onClickKeyword(keyword) {
		this.search(keyword);
	},
	onClickHistory(keyword) {
		this.search(keyword);
	},
	onDeleteHistory({ detail: { keyword } }) {
		this.deleteHistory(keyword);
	},
};
